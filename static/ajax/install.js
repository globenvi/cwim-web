document.addEventListener('DOMContentLoaded', () => {
    const createDbForm = document.getElementById('create-db-form');
    const createAdminForm = document.getElementById('create-admin-form');

    createDbForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Это предотвращает перезагрузку страницы

        const formData = {
            db_host: document.getElementById('db_host').value,
            db_port: document.getElementById('db_port').value,
            db_user: document.getElementById('db_user').value,
            db_password: document.getElementById('db_password').value,
            db_name: document.getElementById('db_name').value,
            secret_key: document.getElementById('secret_key').value,

            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value

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
                createDbForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const adminData = {
                        username: document.getElementById('username').value,
                        password: document.getElementById('password').value,
                        email: document.getElementById('email').value
                    };
                    try {
                        const response = await fetch('/create_admin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(adminData)
                        });

                        const result = await response.json();

                        if (result.success) {
                            showAlert("Администратор успешно создан!", "success");
                        } else {
                            showAlert("Не удалось создать администратора!", "danger");
                        }
                    } catch (error) {
                        showAlert('Ошибка при отправке запроса.', 'danger');
                        console.error('Ошибка при отправке запроса:', error);
                    }
                });
            } else {
                showAlert("Не удалось подключиться!", "danger");
            }
        } catch (error) {
            showAlert('Ошибка при отправке запроса.', 'danger');
            console.error('Ошибка при отправке запроса:', error);
        }
    });
});
