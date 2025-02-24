document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav__list .header__link');

    // Наведение мыши
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textDecoration = 'underline';
        });
        link.addEventListener('mouseleave', () => {
            link.style.textDecoration = 'none';
        });

        // Активное состояние для текущей страницы
        const currentLocation = document.location.href;
        if (link.href === currentLocation) {
            link.classList.add('active-link');
        }
    });
});
