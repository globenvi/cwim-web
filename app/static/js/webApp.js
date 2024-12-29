// === Telegram WebApp Interaction Script ===

// Смена темы WebApp при изменении в Telegram
Telegram.WebApp.onEvent("themeChanged", function () {
    const themeParams = Telegram.WebApp.themeParams;
    saveThemeParams(themeParams); // Сохраняем тему
    applyThemeParams(themeParams); // Применяем новую тему
});

// Загрузка страницы
document.addEventListener("DOMContentLoaded", function () {
    initializeWebApp();
});

// === Основные функции ===

// Инициализация WebApp
function initializeWebApp() {
    // Загрузка сохранённой темы или установка дефолтной
    const savedThemeParams = getSavedThemeParams();
    if (savedThemeParams) {
        applyThemeParams(savedThemeParams);
    } else {
        applyThemeParams(); // Используем дефолтные значения
    }

    // Управление кнопкой "Назад"
    manageBackButton();

    // Управление вибрациями для кнопок и ссылок
    manageClickableElements();

    // Раскрытие WebApp на весь экран
    Telegram.WebApp.expand();

    // Слушаем изменения пути для управления кнопкой "Назад"
    window.addEventListener("popstate", manageBackButton);
}

// Сохранение параметров темы в localStorage
function saveThemeParams(themeParams) {
    localStorage.setItem('themeParams', JSON.stringify(themeParams));
}

// Загрузка сохранённых параметров темы
function getSavedThemeParams() {
    const themeParams = localStorage.getItem('themeParams');
    return themeParams ? JSON.parse(themeParams) : null;
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
    const currentPath = window.location.pathname;

    if (currentPath !== '/') {
        // Если текущий путь не "/"
        Telegram.WebApp.BackButton.show();
        localStorage.setItem('backButtonVisible', 'true'); // Запоминаем, что кнопка "Назад" видна
        Telegram.WebApp.BackButton.onClick(function () {
            window.history.back(); // Возврат на предыдущую страницу
        });
    } else {
        // Если на главной странице "/"
        if (localStorage.getItem('backButtonVisible') === 'true') {
            location.reload(); // Перезагружаем страницу при возвращении на главную
            localStorage.removeItem('backButtonVisible'); // Убираем сохранённый флаг
        }
        Telegram.WebApp.BackButton.hide();
    }
}

// Управление вибрацией для элементов
function manageClickableElements() {
    const clickableElements = document.querySelectorAll('button, a'); // Все кнопки и ссылки
    clickableElements.forEach(element => {
        element.removeEventListener('click', vibrateOnClick); // Убираем предыдущий слушатель
        element.addEventListener('click', vibrateOnClick); // Добавляем новый
    });
}

// Функция вибрации
function vibrateOnClick() {
    Telegram.WebApp.vibrate();
}

// === Дополнительные функции ===

// Добавление кнопки в интерфейс WebApp
function addWebAppButton(text, callback) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'webapp-button'; // Можно добавить стили для этой кнопки
    button.addEventListener('click', callback);
    document.body.appendChild(button); // Добавляем кнопку в тело страницы
}

// Пример использования дополнительной кнопки
addWebAppButton('Test Button', function () {
    console.log('Test button clicked');
    vibrateOnClick(); // Вибрация при нажатии
});
