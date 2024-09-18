document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate email domain (only allow noroff.no and stud.noroff.no)
    const emailPattern = /@(?:noroff\.no|stud\.noroff\.no)$/;
    if (!emailPattern.test(email)) {
      alert('Please use a valid Noroff email address.');
      return;
    }
  
    const registrationData = {
      name: username,
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register.');
      }
  
      const result = await response.json();
      alert('Registration successful! You can now log in.');
      window.location.href = 'login.html'; // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering: ' + error.message);
    }
  });
  
