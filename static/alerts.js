// showAlert.js
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container');

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-message shadow-sm`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to container
    alertContainer.appendChild(alert);

    // Show alert
    alert.style.display = 'block';

    // Remove after 3 seconds
    setTimeout(() => {
        alert.classList.add('fade');
        setTimeout(() => alert.remove(), 4000); // Wait for fade-out animation
    }, 6000);
}
