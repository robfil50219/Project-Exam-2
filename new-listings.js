document.getElementById('new-listing-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form submission

  const token = localStorage.getItem('authToken'); // Assuming user is logged in and token is stored
  if (!token) {
      alert('You need to be logged in to create a listing.');
      window.location.href = 'login.html';
      return;
  }

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const media = document.getElementById('media').value;
  const endsAt = document.getElementById('end-date').value;

  const listingData = {
      title: title,
      description: description,
      endsAt: endsAt,
      media: media ? [media] : [],
      tags: []
  };

  try {
      const response = await fetch('https://v2.api.noroff.dev/auction/listings', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,  // Correct authentication header
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(listingData)
      });

      if (response.status === 401) {
          throw new Error('Unauthorized: Token may be invalid or expired.');
      }

      if (!response.ok) {
          throw new Error('Failed to create listing');
      }

      const result = await response.json();
      alert('Listing created successfully!');
      window.location.href = 'profile.html'; // Redirect to profile or listings page
  } catch (error) {
      console.error('Error creating listing:', error);
      alert('Error creating listing. Please try again.');
  }
});
