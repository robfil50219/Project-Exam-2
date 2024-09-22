document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      // User is logged in, show profile and logout buttons
      document.getElementById('login-btn').style.display = 'none';
      document.getElementById('register-btn').style.display = 'none';
      document.getElementById('logout-btn').style.display = 'block';
      document.getElementById('profile-btn').style.display = 'block';
  
      // Fetch the user's profile data to get the avatar
      fetchProfileData();
    } else {
      // User is not logged in, hide profile and logout buttons
      document.getElementById('logout-btn').style.display = 'none';
      document.getElementById('profile-btn').style.display = 'none';
    }
  
    // Logout function
    document.getElementById('logout-btn').addEventListener('click', function () {
      localStorage.removeItem('authToken');
      alert('Logged out successfully!');
      window.location.href = 'login.html';
    });
  });
  
  // Function to fetch profile data and set avatar
  async function fetchProfileData() {
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/profiles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to load profile data.');
      }
  
      const profileData = await response.json();
      const avatar = profileData.avatar?.url || 'path-to-default-avatar.jpg'; // Replace with default avatar path
      document.getElementById('profile-avatar').src = avatar;
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }
  
