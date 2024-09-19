document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      window.location.href = 'login.html'; // Redirect if not logged in
      return;
    }
  
    try {
      // Fetch user profile data
      const response = await fetch('https://v2.api.noroff.dev/auction/profiles/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to load profile data.');
      }
  
      const profileData = await response.json();
      document.getElementById('profile-name').textContent = profileData.name;
      document.getElementById('profile-email').textContent = profileData.email;
      document.getElementById('profile-credits').textContent = profileData.credits;
  
      const avatar = profileData.avatar?.url || 'default-avatar.jpg';
      document.getElementById('profile-avatar').src = avatar;
  
      // Pre-fill form with current data
      document.getElementById('edit-username').value = profileData.name;
      document.getElementById('edit-email').value = profileData.email;
      document.getElementById('edit-avatar').value = profileData.avatar?.url || '';
  
      // Form submission logic
      document.getElementById('edit-profile-form').addEventListener('submit', async function (event) {
        event.preventDefault();
  
        const newUsername = document.getElementById('edit-username').value;
        const newEmail = document.getElementById('edit-email').value;
        const newAvatar = document.getElementById('edit-avatar').value;
  
        try {
          const updateResponse = await fetch('https://v2.api.noroff.dev/auction/profiles/me', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: newUsername,
              email: newEmail,
              avatar: { url: newAvatar },
            }),
          });
  
          if (!updateResponse.ok) {
            throw new Error('Failed to update profile.');
          }
  
          document.getElementById('profile-update-message').textContent = 'Profile updated successfully!';
        } catch (error) {
          console.error('Error updating profile:', error);
          document.getElementById('profile-update-message').textContent = 'Error updating profile.';
        }
      });
  
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  });
  