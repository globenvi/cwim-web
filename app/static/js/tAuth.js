// Функция для создания хэша данных
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
    const tg = window.Telegram.WebApp;

    const debugContainer = document.getElementById("debug-log");
    const logEntry = document.createElement("pre");
    logEntry.textContent = message;
    debugContainer.appendChild(logEntry); // Добавление нового сообщения
    debugContainer.appendChild(JSON.stringify(tg))
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

    return telegramData;
}

// Главная функция обработки данных
function handleAuthFlow() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedHash = localStorage.getItem(LOCAL_STORAGE_HASH_KEY);

    if (storedData && storedHash) {
        const parsedData = JSON.parse(storedData);
        const currentHash = createHash(parsedData);

        if (currentHash !== storedHash) {
            console.log("Данные изменились, отправка на сервер...");
            displayDebugLog("Данные изменились, отправка на сервер...");
            sendAuthDataToServer(parsedData);
            localStorage.setItem(LOCAL_STORAGE_HASH_KEY, currentHash);
        } else {
            console.log("Данные актуальны, обновление не требуется.");
            displayDebugLog("Данные актуальны, обновление не требуется.");
        }
    } else {
        const telegramData = fetchTelegramData();

        if (telegramData) {
            const hash = createHash(telegramData);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(telegramData));
            localStorage.setItem(LOCAL_STORAGE_HASH_KEY, hash);
            sendAuthDataToServer(telegramData);
        }
    }
}

// Запускаем процесс авторизации при загрузке страницы
document.addEventListener("DOMContentLoaded", handleAuthFlow);
