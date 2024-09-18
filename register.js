document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const confirmPasswordInput = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Email validation for @noroff.no or @stud.noroff.no
    if (!emailInput.endsWith('@noroff.no') && !emailInput.endsWith('@stud.noroff.no')) {
        errorMessage.textContent = 'Please use a valid @noroff.no or @stud.noroff.no email address to register.';
        return;
    }

    // Password confirmation check
    if (passwordInput !== confirmPasswordInput) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // If all checks pass, clear any error message
    errorMessage.textContent = '';

   
    const formData = {
        email: emailInput,
        password: passwordInput,
    };

    fetch('https://your-api-endpoint/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'login.html'; // Redirect to login page on successful registration
            } else {
                errorMessage.textContent = data.message || 'An error occurred during registration.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Failed to register. Please try again later.';
        });
});

