document.addEventListener('DOMContentLoaded', () => {
    const createDbForm = document.getElementById('create-db-form');

    createDbForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Это предотвращает перезагрузку страницы

        const formData = {
            db_host: document.getElementById('db_host').value,
            db_port: document.getElementById('db_port').value,
            db_user: document.getElementById('db_user').value,
            db_password: document.getElementById('db_password').value,
            db_name: document.getElementById('db_name').value,
            secret_key: document.getElementById('secret_key').value
        };

        try {
            const response = await fetch('/check_db_connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                showAlert("Успешное подключение!", "success");
            } else {
                showAlert(result.message || "Ошибка! Проверьте данные!", "danger");
            }
        } catch (error) {
            showAlert('Ошибка при отправке запроса.', 'danger');
            console.error('Ошибка при отправке запроса:', error);
        }
    });
});
