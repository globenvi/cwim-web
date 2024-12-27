document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Отключаем стандартное поведение отправки формы

      // Получаем данные из формы
      const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };

      // Отправляем AJAX-запрос
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          // Показываем сообщение об успешном входе и перенаправляем
          messageDiv.style.color = 'green';
          messageDiv.textContent = 'Успешная авторизация! Перенаправление...';
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000); // Задержка перед редиректом
        } else {
          // Показываем сообщение об ошибке
          messageDiv.style.color = 'red';
          messageDiv.textContent = result.message;
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Произошла ошибка. Попробуйте снова.';
      }
    });
  });

