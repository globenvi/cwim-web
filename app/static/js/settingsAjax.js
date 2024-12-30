function sendFormData(url, formIds = [], elementIds = []) {
    // Собираем данные форм
    const formData = new FormData();

    formIds.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            new FormData(form).forEach((value, key) => {
                formData.append(key, value);
            });
        } else {
            console.warn(`Форма с ID "${formId}" не найдена`);
        }
    });

    // Добавляем данные отдельных элементов
    elementIds.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            const key = element.name || element.id; // Используем имя или ID элемента как ключ
            const value = element.value || element.textContent; // Используем значение или текст элемента
            formData.append(key, value);
        } else {
            console.warn(`Элемент с ID "${elementId}" не найден`);
        }
    });

    // Отправляем данные через fetch
    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешно отправлено:', data);
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
        });
}

// // Пример использования
// document.getElementById('submitBtn').addEventListener('click', () => {
//     sendFormData('/submit', ['form1', 'form2'], ['customInput', 'extraField']);
// });

// Пример использования 2
// document.getElementById('submitBtn').addEventListener('click', () => {
//     sendSingleFormData('/submit', 'form1');
// });