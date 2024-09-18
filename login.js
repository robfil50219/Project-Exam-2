document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const loginData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }
  
      const result = await response.json();
      const accessToken = result.data.accessToken;
  
      // Store the accessToken in localStorage (or sessionStorage)
      localStorage.setItem('accessToken', accessToken);
  
      alert('Login successful!');
      window.location.href = 'index.html'; // Redirect to main page after successful login
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in: ' + error.message);
    }
  });
  
  
