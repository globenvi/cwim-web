// === Telegram WebApp Interaction Script ===

// Смена темы WebApp при изменении в Telegram
Telegram.WebApp.onEvent("themeChanged", function () {
    const themeParams = Telegram.WebApp.themeParams;
    applyThemeParams(themeParams); // Применяем новую тему
});

// Загрузка страницы
document.addEventListener("DOMContentLoaded", function () {
    initializeWebApp();
});

// === Основные функции ===

// Инициализация WebApp
function initializeWebApp() {
    // Применяем тему
    const themeParams = Telegram.WebApp.themeParams;
    applyThemeParams(themeParams);

    // Управление кнопкой "Назад"
    manageBackButton();

    // Управление вибрациями для кнопок и ссылок
    manageClickableElements();

    // Раскрытие WebApp на весь экран
    Telegram.WebApp.expand();

    // Слушаем изменения пути для управления кнопкой "Назад"
    window.addEventListener("popstate", manageBackButton);
}

// Применение параметров темы
function applyThemeParams(themeParams = {}) {
    document.documentElement.style.setProperty('--tg-main-color', themeParams.button_color || '#0088cc');
    document.documentElement.style.setProperty('--tg-background-color', themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-secondary-color', themeParams.secondary_bg_color || '#f0f0f0');
    document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color || '#333333');
    document.documentElement.style.setProperty('--tg-border-color', themeParams.hint_color || '#dddddd');
}

// Управление кнопкой "Назад"
function manageBackButton() {
    // Получаем текущий путь
    const currentPath = window.location.pathname;

    const BackButton = Telegram.WebApp.BackButton;

    // Если мы не на главной странице
    if (currentPath !== '/') {
        BackButton.show();
        BackButton.onClick(function () {
            // Перезагружаем текущую страницу
            window.location.reload();
            // Скрыть кнопку после клика
            BackButton.hide();
        });
    } else {
        // Если мы на главной странице, скрываем кнопку "Назад"
        BackButton.hide();
    }
}

// Слушаем событие назад
Telegram.WebApp.onEvent('backButtonClicked', function() {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
        // Если мы не на главной странице, перезагружаем
        window.location.reload();
    }
});

// Управление вибрацией для элементов
function manageClickableElements() {
    const clickableElements = document.querySelectorAll('button, a'); // Все кнопки и ссылки
    clickableElements.forEach(element => {
        element.removeEventListener('click', vibrateOnClick); // Убираем предыдущий слушатель
        element.addEventListener('click', vibrateOnClick); // Добавляем новый
    });
}