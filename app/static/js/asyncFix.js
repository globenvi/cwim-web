(function () {
    const reloadedKey = 'reloaded_for_url';

    // Функция для проверки и перезагрузки страницы
    function reloadIfNeeded() {
        const currentUrl = window.location.href;

        // Проверяем, был ли этот URL уже перезагружен
        if (sessionStorage.getItem(reloadedKey) !== currentUrl) {
            sessionStorage.setItem(reloadedKey, currentUrl); // Сохраняем новый URL
            window.location.reload(); // Перезагружаем страницу
        }
    }

    // Перехват изменения URL через pushState, replaceState и popstate
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    // Переопределяем pushState
    history.pushState = function (...args) {
        originalPushState.apply(this, args);
        reloadIfNeeded(); // Вызываем проверку после изменения URL
    };

    // Переопределяем replaceState
    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        reloadIfNeeded(); // Вызываем проверку после изменения URL
    };

    // Слушаем изменения истории
    window.addEventListener('popstate', reloadIfNeeded);

    // Также проверяем, если используется хэш-навигация
    window.addEventListener('hashchange', reloadIfNeeded);
})();
