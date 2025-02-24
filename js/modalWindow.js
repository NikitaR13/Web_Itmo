document.addEventListener("DOMContentLoaded", () => {
    MicroModal.init();

    // Выбираем все элементы с классом 'car-item', которые будут карточками автомобилей
    const carItems = document.querySelectorAll(".car-item");

    // Для каждой карточки добавляем обработчик события клика
    carItems.forEach(car => {
        car.addEventListener("click", () => {
            // Извлекаем название автомобиля из <h3> внутри карточки
            const carTitle = car.querySelector("h3").innerText;

            // Извлекаем ссылку на изображение из <img>
            const carImage = car.querySelector("img").src;

            // Извлекаем описание из <p> внутри карточки
            const carDescription = car.querySelector("p").innerText;

            // Вставляем название с id "modal-title"
            document.getElementById("modal-title").innerText = carTitle;
            
            // Вставляем ссылку на изображение с id "modal-image"
            document.getElementById("modal-image").src = carImage;
            
            // Вставляем описание с id "modal-description"
            document.getElementById("modal-description").innerText = carDescription;

            // MicroModal.show() — открывает модальное окно с указанным id "car-modal"
            MicroModal.show("car-modal");
        });
    });
});
