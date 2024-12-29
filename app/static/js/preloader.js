function simulateDataLoading() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Загрузка завершена");
        }, 3000); // Задержка 3 секунды
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    // Имитируем задержку в 3 секунды для загрузки данных
    await simulateDataLoading();
    
    // Скрываем прелоадер
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    
    // Отображаем основной контент
    const content = document.getElementById('content');
    content.style.display = 'block';
});