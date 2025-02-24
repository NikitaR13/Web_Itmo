document.addEventListener('DOMContentLoaded', () => {
    const photosContainer = document.getElementById('photosContainer');
    const preloader = document.getElementById('preloader');
    const photoTemplate = document.getElementById('photoTemplate').content;
    const URI = 'https://jsonplaceholder.typicode.com/photos?_limit=10';

    async function loadPhotos() {
        try {
            const response = await fetchData(URI);
            const photos = await response.json();
            preloader.style.display = 'none';
            photosContainer.innerHTML = '';

            photos.forEach(createPhoto);
        } catch (error) {
            handleError(error);
        }
    }

    async function fetchData(URI) {
        const response = await fetch(URI);
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        return response;
    }

    function createPhoto(photo) {
        const photoElement = document.importNode(photoTemplate, true);
        photoElement.querySelector('.photo-title').textContent = photo.title;
        photoElement.querySelector('.photo-thumbnail').src = photo.thumbnailUrl;
        photoElement.querySelector('.photo-thumbnail').alt = photo.title;
        photoElement.querySelector('.photo-link').href = photo.url;
        photosContainer.appendChild(photoElement);
    }

    function handleError(error) {
        preloader.style.display = 'none';
        photosContainer.innerHTML = '<div class="error"> Что-то пошло не так</div>';
        alert(error.message);
    }

    loadPhotos();
});
