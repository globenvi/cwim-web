document.addEventListener("DOMContentLoaded", async () => {
    const endpoints = ["/tgAuth/tgAuth"];
    const responses = [];

    try {
        // Отправляем запросы ко всем эндпоинтам
        for (const endpoint of endpoints) {
            const response = await fetch(endpoint);
            if (response.ok) {
                responses.push(await response.json());
            } else {
                throw new Error(`Ошибка при загрузке ${endpoint}: ${response.status}`);
            }
        }

        // Если все запросы завершились успешно, скрываем прелоадер и показываем контент
        if (responses.length === endpoints.length) {
            window.location.reload()
            document.getElementById("preloader").style.display = "none";
            document.getElementById("content").style.display = "block";
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        // Здесь можно показать сообщение об ошибке или повторить запросы
    }
});
