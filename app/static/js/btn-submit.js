document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с классом btn-submit
    const buttons = document.querySelectorAll('.btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleSubmit(button);
        });
    });

    function handleSubmit(button) {
        // Запоминаем исходный текст кнопки
        const originalText = button.innerHTML;

        // Устанавливаем класс "loading", чтобы скрыть текст и показать спиннер
        button.classList.add('loading');
        button.innerHTML = ''; // Очищаем текст кнопки

        // Добавляем спиннер
        const spinner = document.createElement('span');
        spinner.classList.add('spinner');
        button.appendChild(spinner);

        // Имитация задержки (например, запрос к серверу)
        setTimeout(function() {
            // Меняем класс на "success" после завершения
            button.classList.remove('loading');
            button.classList.add('success');
            
            // Добавляем галочку вместо текста
            const checkmark = document.createElement('span');
            checkmark.classList.add('fas', 'fa-check');
            button.innerHTML = '';  // Очищаем содержимое кнопки
            button.appendChild(checkmark);

            // Возвращаем исходный текст обратно через 1 секунду
            setTimeout(function() {
                button.classList.remove('success');
                button.innerHTML = originalText; // Возвращаем исходный текст
            }, 1000); // Возвращаем текст через 1 секунду
        }, 2000); // Задержка в 2 секунды
    }
});
