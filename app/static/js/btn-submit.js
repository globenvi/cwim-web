// Найти все кнопки с классом 'btn-submit'
document.querySelectorAll('.btn-submit').forEach((button) => {
  button.addEventListener('click', async function () {
    // Сохранить текущий текст кнопки
    const originalText = button.textContent;

    // Заменить текст кнопки на спиннер
    button.innerHTML = `
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span class="visually-hidden" role="status">Loading...</span>
        `;

    // Заблокировать кнопку
    button.disabled = true;

    try {
      // Эмулируем задержку (например, ожидание ответа от сервера)
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      // Вернуть исходный текст кнопки
      button.innerHTML = originalText;
      button.disabled = false;
    }
  });
});
