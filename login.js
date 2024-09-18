document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
  
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    // Basic email and password validation
    if (!emailInput.includes('@noroff.no') && !emailInput.includes('@stud.noroff.no')) {
      errorMessage.textContent = 'Please use a valid @noroff.no or @stud.noroff.no email address.';
      return;
    }
  
    if (passwordInput.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters long.';
      return;
    }
  
    const loginData = {
      email: emailInput,
      password: passwordInput,
    };
  
    fetch('https://your-api-endpoint/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = 'index.html'; // Redirect to homepage on success
        } else {
          errorMessage.textContent = data.message || 'Invalid email or password.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'Login failed. Please try again later.';
      });
  });
  
