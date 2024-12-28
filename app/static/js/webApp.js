Telegram.WebApp.onEvent("themeChanged", function () {
    const themeParams = Telegram.WebApp.themeParams;
    document.documentElement.style.setProperty('--tg-main-color', themeParams.button_color || '#0088cc');
    document.documentElement.style.setProperty('--tg-background-color', themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-secondary-color', themeParams.secondary_bg_color || '#f0f0f0');
    document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color || '#333333');
    document.documentElement.style.setProperty('--tg-border-color', themeParams.hint_color || '#dddddd');
});

document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.querySelector(".username");
    usernameElement.textContent = `@${Telegram.WebApp.initDataUnsafe.user.username || 'unknown'}`;
});

function vibrateOnClick() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function showPreloader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'flex';
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}