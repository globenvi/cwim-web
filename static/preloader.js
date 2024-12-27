// Ждем, пока вся страница загрузится
window.addEventListener('load', function () {
  // Убираем прелоадер с плавной анимацией
  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    const content = document.querySelector('.content');
    
    preloader.classList.add('hidden'); // Скрываем прелоадер
    setTimeout(() => {
      preloader.style.display = 'none'; // Полностью убираем его из DOM после анимации
    }, 500); // Таймаут совпадает с transition

    content.classList.add('visible'); // Показываем контент
  }, 1500); // Минимальная задержка 1.5 секунды
});