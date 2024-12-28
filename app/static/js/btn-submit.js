document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-submit');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleSubmit(button);
        });
    });

    function handleSubmit(button) {
        const originalText = button.innerHTML;

        button.classList.add('loading');
        button.innerHTML = '';

        const spinner = document.createElement('span');
        spinner.classList.add('spinner');
        button.appendChild(spinner);

        setTimeout(function() {
            button.classList.remove('loading');
            button.classList.add('success');
            
            const checkmark = document.createElement('span');
            checkmark.classList.add('checkmark', 'fas', 'fa-check');
            button.innerHTML = '';
            button.appendChild(checkmark);

            setTimeout(function() {
                button.classList.remove('success');
                button.innerHTML = originalText;
            }, 1000);
        }, 2000);
    }
});
