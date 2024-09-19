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

      // Store the accessToken in localStorage
      localStorage.setItem('authToken', accessToken);

      alert('Login successful!');
      window.location.href = 'index.html'; // Redirect to the main page after successful login
  } catch (error) {
      console.error('Error:', error);
      alert('Error logging in: ' + error.message);
  }
});

// Add logout logic
document.getElementById('logout-btn').addEventListener('click', function() {
  // Clear the token from localStorage
  localStorage.removeItem('authToken');

  // Optionally, clear other user-specific data if needed
  alert('Logged out successfully!');
  
  // Redirect to login page or refresh
  window.location.href = 'login.html'; 
});

// Function to check login status and update the UI
function checkLoginStatus() {
  const token = localStorage.getItem('authToken');

  if (token) {
      // User is logged in, hide login/register buttons and show logout button
      document.getElementById('login-btn').style.display = 'none';
      document.getElementById('register-btn').style.display = 'none';
      document.getElementById('logout-btn').style.display = 'block';
  } else {
      // User is not logged in, show login/register buttons and hide logout button
      document.getElementById('login-btn').style.display = 'block';
      document.getElementById('register-btn').style.display = 'block';
      document.getElementById('logout-btn').style.display = 'none';
  }
}

// Call this function on page load to check login status
document.addEventListener('DOMContentLoaded', checkLoginStatus);

  
