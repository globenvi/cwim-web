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
function displayDebugLog(message) {
    const debugContainer = document.getElementById("debug-log");
    const logEntry = document.createElement("pre");
    logEntry.textContent = message;
    debugContainer.appendChild(logEntry); // Добавление нового сообщения
}

// Функция для получения данных из Telegram WebApp API
function fetchTelegramData() {
    const tg = window.Telegram.WebApp;

    // Проверяем, доступен ли объект Telegram
    if (!tg.initData || !tg.initDataUnsafe) {
        const errorMessage = "Telegram WebApp data is not available.";
        console.error(errorMessage);
        displayDebugLog(errorMessage); // Лог ошибки
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
    const telegramDataContainer = document.getElementById("telegram-data");
    telegramDataContainer.textContent = JSON.stringify(telegramData, null, 2);

    return telegramData;
}

// Функция для постоянного опроса данных из Telegram WebApp API
function startPolling() {

    const telegramData = fetchTelegramData();

    if (telegramData) {
        // Отправляем данные на сервер, если необходимо
        // sendAuthDataToServer(telegramData); // Эта функция теперь не используется
    }
}

// Запускаем процесс опроса при загрузке страницы
document.addEventListener("DOMContentLoaded", startPolling);
