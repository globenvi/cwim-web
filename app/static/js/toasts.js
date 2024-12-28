function showToast(type, message, size) {
    // Создаем новый элемент toast
    const toast = document.createElement('div');
    toast.classList.add('toast', type, size, 'show');
    toast.innerText = message;

    // Добавляем toast в контейнер
    const toastContainer = document.getElementById('toastContainer');
    toastContainer.appendChild(toast);

    // Убираем toast через 5 секунд
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        // Удаляем элемент после анимации исчезновения
        setTimeout(() => {
            toast.remove();
        }, 500); // Убираем toast через 0.5 секунды, после анимации
    }, 5000); // Убираем toast через 5 секунд
}