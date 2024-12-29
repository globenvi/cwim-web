// Храним ключи localStorage
const LOCAL_STORAGE_KEY = "tgAuthData";
const LOCAL_STORAGE_HASH_KEY = "tgAuthDataHash";

// Функция для создания хэша данных
function createHash(data) {
    return btoa(JSON.stringify(data));
}

// Функция для отправки данных на сервер
function sendAuthDataToServer(data) {
    fetch("/tg-auth", {
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
            console.log("Server response:", serverResponse);
        })
        .catch((error) => {
            console.error("Error sending data to server:", error.message);
        });
}

// Функция для получения данных из Telegram WebApp API
function fetchTelegramData() {
    const tg = window.Telegram.WebApp;

    // Проверяем, доступен ли объект Telegram
    if (!tg.initData || !tg.initDataUnsafe) {
        console.error("Telegram WebApp data is not available.");
        return null;
    }

    // Извлекаем данные
    const userData = tg.initDataUnsafe.user || {};
    const chatData = tg.initDataUnsafe.chat || {};
    const initData = tg.initData;
    const authDate = tg.initDataUnsafe.auth_date;
    const hash = tg.initDataUnsafe.hash;

    return {
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
}

// Главная функция обработки данных
function handleAuthFlow() {
    // Проверяем, есть ли данные в localStorage
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedHash = localStorage.getItem(LOCAL_STORAGE_HASH_KEY);

    if (storedData && storedHash) {
        // Данные есть, отправляем их на сервер
        const parsedData = JSON.parse(storedData);
        const currentHash = createHash(parsedData);

        // Проверяем изменения
        if (currentHash !== storedHash) {
            console.log("Data has changed, updating server...");
            sendAuthDataToServer(parsedData);
            localStorage.setItem(LOCAL_STORAGE_HASH_KEY, currentHash);
        } else {
            console.log("Data is up-to-date, skipping update.");
        }
    } else {
        // Данных нет, опрашиваем Telegram API
        const telegramData = fetchTelegramData();

        if (telegramData) {
            // Сохраняем данные в localStorage
            const hash = createHash(telegramData);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(telegramData));
            localStorage.setItem(LOCAL_STORAGE_HASH_KEY, hash);

            // Отправляем данные на сервер
            sendAuthDataToServer(telegramData);
        }
    }
}

// Запускаем процесс авторизации при загрузке страницы
document.addEventListener("DOMContentLoaded", handleAuthFlow);
