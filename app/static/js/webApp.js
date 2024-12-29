// Обработчик изменения темы
Telegram.WebApp.onEvent("themeChanged", function () {
    const themeParams = Telegram.WebApp.themeParams;

    // Сохраняем тему в localStorage
    localStorage.setItem('themeParams', JSON.stringify(themeParams));

    // Применяем параметры
    applyThemeParams(themeParams);
});

// Загрузка сохранённой темы при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    const savedThemeParams = localStorage.getItem('themeParams');
    if (savedThemeParams) {
        const themeParams = JSON.parse(savedThemeParams);
        applyThemeParams(themeParams);
    } else {
        applyThemeParams(); // Используем дефолтные значения
    }

    // Инициализация данных пользователя
    const usernameElement = document.querySelector(".username");
    if (usernameElement) {
        usernameElement.textContent = `@${Telegram.WebApp.initDataUnsafe.user.username || 'unknown'}`;
    }

    // Управление вибрацией при клике на кнопки и ссылки
    manageClickableElements();

    // Управление кнопкой "Назад"
    manageBackButton();

    // Показываем основное окно WebApp
    Telegram.WebApp.ready();

    // Слушаем изменения пути (для кнопки "Назад")
    window.addEventListener("popstate", manageBackButton);
});

// Применение параметров темы
function applyThemeParams(themeParams = {}) {
    document.documentElement.style.setProperty('--tg-main-color', themeParams.button_color || '#0088cc');
    document.documentElement.style.setProperty('--tg-background-color', themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-secondary-color', themeParams.secondary_bg_color || '#f0f0f0');
    document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color || '#333333');
    document.documentElement.style.setProperty('--tg-border-color', themeParams.hint_color || '#dddddd');
}

// Управление кликабельными элементами
function manageClickableElements() {
    const clickableElements = document.querySelectorAll('button, a'); // Выбираем все кнопки и ссылки
    clickableElements.forEach(element => {
        element.removeEventListener('click', vibrateOnClick); // Убираем предыдущий слушатель, если есть
        element.addEventListener('click', vibrateOnClick);    // Добавляем новый
    });
}

// Функция вибрации через Telegram API
function vibrateOnClick() {
    Telegram.WebApp.vibrate();
}

// Управление кнопкой "Назад"
function manageBackButton() {
    const currentPath = window.location.pathname;

    if (currentPath !== '/') {
        Telegram.WebApp.BackButton.show();
        Telegram.WebApp.BackButton.onClick(function () {
            window.history.back(); // Возврат на предыдущую страницу
        });
    } else {
        Telegram.WebApp.BackButton.hide();
    }
}

// Функции для отображения/скрытия прелоадера
function showPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'flex';
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
}

// Управление окном WebApp
function expandWebApp() {
    Telegram.WebApp.expand(); // Раскрываем WebApp на весь экран
}

function closeWebApp() {
    Telegram.WebApp.close(); // Закрываем WebApp
}

// Инициализация WebApp окна
document.addEventListener("DOMContentLoaded", function () {
    expandWebApp(); // Раскрываем окно при загрузке
});
