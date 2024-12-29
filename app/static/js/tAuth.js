// Функция для создания хэша данных (не используется в данном случае, так как мы убрали localStorage)
function createHash(data) {
    return btoa(JSON.stringify(data));
}

// Функция для отображения ответа на странице
function displayResponse(data) {
    const responseContainer = document.getElementById("server-response");
    responseContainer.textContent = JSON.stringify(data, null, 2); // Красивое форматирование JSON
}

// Функция для отображения дебаг-логов на странице
function displayDebugLog(message, isError = false) {
    const debugContainer = document.getElementById("debug-log");

    // Добавляем сообщение с учетом, является ли оно ошибкой
    const logEntry = document.createElement("pre");
    logEntry.textContent = message;
    logEntry.style.color = isError ? 'red' : 'black';  // Если ошибка, то красный цвет
    debugContainer.appendChild(logEntry); // Добавление нового сообщения
}

// Функция для получения данных из Telegram WebApp API
function fetchTelegramData() {
    const tg = window.Telegram.WebApp;

    // Проверяем, доступен ли объект Telegram
    if (!tg.initData || !tg.initDataUnsafe) {
        const errorMessage = "Telegram WebApp data is not available.";
        console.error(errorMessage);
        displayDebugLog(errorMessage, true); // Лог ошибки
        return null;
    }

    // Извлекаем данные
    const userData = tg.initDataUnsafe.user || {};

    const telegramData = {
        user: {
            id: userData.id || null,
            first_name: userData.first_name || null,
            last_name: userData.last_name || null,
            username: userData.username || null,
            language_code: userData.language_code || null,
            is_premium: userData.is_premium || false,
            photo_url: userData.photo_url || null,
        },
    };

    console.log("Полученные данные из Telegram API:", telegramData); // Лог данных
    displayDebugLog("Полученные данные из Telegram API: " + JSON.stringify(telegramData, null, 2)); // Лог на страницу

    // Отображаем полученные данные на странице
    displayResponse(telegramData);

    return telegramData;
}

// Функция для постоянного опроса данных из Telegram WebApp API
function startPolling() {
    const telegramData = fetchTelegramData();

    if (telegramData) {
        // Можно добавить логику для отправки данных на сервер, если необходимо
    }
}

// Запускаем процесс опроса при загрузке страницы
document.addEventListener("DOMContentLoaded", startPolling);
