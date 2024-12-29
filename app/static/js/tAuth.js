// Функция для отображения дебаг-логов на странице
function displayDebugLog(message, isError = false) {
    const debugContainer = document.getElementById("debug-log");

    // Создаем новый элемент <pre> для отображения лога
    const logEntry = document.createElement("pre");
    logEntry.textContent = message;
    logEntry.style.color = isError ? 'red' : 'black';  // Красный цвет для ошибок

    // Добавляем лог в контейнер
    debugContainer.appendChild(logEntry);
    
    // Прокрутка контейнера вниз, чтобы новый лог был виден
    debugContainer.scrollTop = debugContainer.scrollHeight;
}

// Пример вызова функции для дебаг-логирования
displayDebugLog("Пример сообщения для лога.");

// Пример запроса и получения данных
function fetchTelegramData() {
    const tg = window.Telegram.WebApp;

    if (!tg.initData || !tg.initDataUnsafe) {
        const errorMessage = "Telegram WebApp data is not available.";
        displayDebugLog(errorMessage, true);  // Ошибка в логе
        return null;
    }

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

    const successMessage = "Получены данные из Telegram WebApp: " + JSON.stringify(telegramData, null, 2);
    displayDebugLog(successMessage);  // Успех в логе

    return telegramData;
}

// Запуск функции получения данных
document.addEventListener("DOMContentLoaded", fetchTelegramData);