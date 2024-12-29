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

// Пример запроса и получения данных из Telegram WebApp
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

    // Отправка данных на сервер
    sendDataToServer(telegramData);

    return telegramData;
}

// Функция для отправки данных на сервер
function sendDataToServer(data) {
    displayDebugLog("Отправка данных на сервер...");

    fetch('/', {  // Замените на реальный URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка при отправке данных: ${response.statusText}`);
        }
        return response.json();
    })
    .then(responseData => {
        // Отображаем ответ от сервера в логе
        const serverResponseMessage = "Ответ от сервера: " + JSON.stringify(responseData, null, 2);
        displayDebugLog(serverResponseMessage);  // Логируем ответ от сервера
    })
    .catch(error => {
        // Если произошла ошибка при запросе
        const errorMessage = "Ошибка при отправке данных на сервер: " + error.message;
        displayDebugLog(errorMessage, true);  // Логируем ошибку
    });
}

// Запуск функции получения данных при загрузке страницы
document.addEventListener("DOMContentLoaded", fetchTelegramData);