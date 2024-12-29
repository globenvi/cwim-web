// Функция для создания хэша данных (не используется в данном случае, так как мы убрали localStorage)
function createHash(data) {
    return btoa(JSON.stringify(data));
}

// Функция для отправки данных на сервер
function sendAuthDataToServer(data) {
    console.log("Отправка данных на сервер:", data); // Лог отправляемых данных
    displayDebugLog("Отправка данных на сервер: " + JSON.stringify(data, null, 2)); // Вывод на страницу

    fetch("/telegramAuth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            return response.json();
        })
        .then((serverResponse) => {
            console.log("Ответ от сервера:", serverResponse); // Лог ответа
            displayResponse(serverResponse); // Вывод ответа на страницу
            displayDebugLog("Ответ от сервера: " + JSON.stringify(serverResponse, null, 2)); // Лог на страницу
        })
        .catch((error) => {
            console.error("Ошибка отправки данных на сервер:", error.message); // Лог ошибки
            displayResponse({ error: error.message }); // Вывод ошибки на страницу
            displayDebugLog("Ошибка: " + error.message); // Лог ошибки на страницу
        });
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
    const chatData = tg.initDataUnsafe.chat || {};
    const initData = tg.initData;
    const authDate = tg.initDataUnsafe.auth_date;
    const hash = tg.initDataUnsafe.hash;

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
        chat: {
            id: chatData.id || null,
            type: chatData.type || null,
            title: chatData.title || null,
            username: chatData.username || null,
            photo_url: chatData.photo_url || null,
        },
        auth: {
            initData: initData,
            authDate: authDate,
            hash: hash,
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
    setInterval(() => {
        const telegramData = fetchTelegramData();
        if (telegramData) {
            sendAuthDataToServer(telegramData);
        }
    }, 5000); // Интервал опроса данных 5 секунд
}

// Запускаем процесс опроса при загрузке страницы
document.addEventListener("DOMContentLoaded", startPolling);
