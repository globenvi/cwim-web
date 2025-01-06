window.addEventListener("load", () => {
    const footer = document.querySelector(".floating-footer");

    // Добавляем класс "show" для отображения футера
    setTimeout(() => {
        footer.classList.add("show");
    }, 1000); // 1000 миллисекунд (1 секунда) задержки

    // Закрытие футера
    const closeButton = document.querySelector(".close-footer");
    closeButton.addEventListener("click", () => {
        footer.classList.remove("show");
    });
});