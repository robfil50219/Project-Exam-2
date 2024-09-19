// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');

    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
    const logoutButton = document.getElementById('logout-btn');

    if (token) {
        // User is logged in, hide login/register and show logout
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
    } else {
        // User is not logged in, show login/register and hide logout
        if (loginButton) loginButton.style.display = 'block';
        if (registerButton) registerButton.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
    }
});

// Logout logic
document.getElementById('logout-btn').addEventListener('click', () => {
    // Remove the token
    localStorage.removeItem('authToken');
    alert('You have been logged out!');
    // Redirect to login page
    window.location.href = 'login.html';
});
