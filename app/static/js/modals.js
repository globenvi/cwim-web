document.addEventListener("DOMContentLoaded", function() {
    const openModalBtns = document.querySelectorAll(".openModalBtn");
    const closeModalBtns = document.querySelectorAll(".close");
    const modals = document.querySelectorAll(".modal");

    // Открытие модального окна
    openModalBtns.forEach(button => {
        button.addEventListener("click", function() {
            const modalId = button.getAttribute("data-modal-id");
            const modal = document.getElementById(modalId);
            modal.style.display = "flex"; // Показываем модальное окно
        });
    });

    // Закрытие модального окна
    closeModalBtns.forEach(button => {
        button.addEventListener("click", function() {
            const modal = button.closest(".modal");
            modal.style.display = "none"; // Скрываем модальное окно
        });
    });

    // Закрытие модального окна при клике вне области модала
    window.addEventListener("click", function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});