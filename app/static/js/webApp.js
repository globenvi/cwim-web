// Обработчик изменения темы
Telegram.WebApp.onEvent("themeChanged", function () {
    const themeParams = Telegram.WebApp.themeParams;
    document.documentElement.style.setProperty('--tg-main-color', themeParams.button_color || '#0088cc');
    document.documentElement.style.setProperty('--tg-background-color', themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-secondary-color', themeParams.secondary_bg_color || '#f0f0f0');
    document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color || '#333333');
    document.documentElement.style.setProperty('--tg-border-color', themeParams.hint_color || '#dddddd');
});

// Обработчик для инициализации данных пользователя
document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.querySelector(".username");
    usernameElement.textContent = `@${Telegram.WebApp.initDataUnsafe.user.username || 'unknown'}`;

    // Управление вибрацией при клике на кнопку или ссылку
    const clickableElements = document.querySelectorAll('button, a'); // Выбираем все кнопки и ссылки

    clickableElements.forEach(element => {
        element.addEventListener('click', function() {
            vibrateOnClick();
        });
    });

    // Показать или скрыть кнопку "Назад", в зависимости от текущего пути
    if (window.location.pathname !== '/') {
        Telegram.WebApp.BackButton.show(); // Показываем кнопку назад на всех страницах, кроме главной
    } else {
        Telegram.WebApp.BackButton.hide(); // Скрываем кнопку назад на главной странице
    }
});

// Функция вибрации через Telegram API
function vibrateOnClick() {
    Telegram.WebApp.vibrate();  // Вибрация при клике
}

// Функции для отображения/скрытия прелоадера
function showPreloader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'flex';
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}

// Дополнительно, если хотите скрыть кнопку назад на других страницах, можно использовать следующее:
Telegram.WebApp.BackButton.onClick(function() {
    console.log("Back button was clicked");
    // Можете добавить логику для обработки нажатия кнопки назад, если нужно
});
