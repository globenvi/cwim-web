document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки с type="submit"
    const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"]');

    submitButtons.forEach(function(button) {
        // Слушаем событие клика по кнопке
        button.addEventListener('click', function(event) {
            // Если кнопка не отключена
            if (!button.disabled) {
                // Делаем кнопку неактивной
                button.disabled = true;

                // Создаем элемент спиннера
                const spinner = document.createElement('span');
                spinner.classList.add('spinner-border', 'spinner-border-sm');
                spinner.setAttribute('role', 'status');
                spinner.setAttribute('aria-hidden', 'true');

                // Вставляем спиннер внутрь кнопки
                button.innerHTML = '';
                button.appendChild(spinner);

                // Добавляем текст "Loading..."
                const loadingText = document.createElement('span');
                loadingText.classList.add('visually-hidden');
                loadingText.textContent = 'Loading...';
                button.appendChild(loadingText);

                // Задержка перед отправкой формы
                setTimeout(function() {
                    // Отправляем форму
                    button.closest('form').submit();
                }, 1500); // Задержка 1.5 секунды (можно изменить)
            }
        });
    });
});
