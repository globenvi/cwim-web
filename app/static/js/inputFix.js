document.addEventListener('click', function(event) {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (!input.contains(event.target) && input === document.activeElement) {
            input.blur();
        }
    });
});