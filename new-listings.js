document.getElementById('new-listing-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent default form submission

  const token = localStorage.getItem('authToken'); // Retrieve token from local storage

  if (!token) {
      alert('You need to be logged in to create a listing.');
      window.location.href = 'login.html';
      return;
  }

  // Gather form data
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
  const media = document.getElementById('media').value;
  const endsAt = document.getElementById('end-date').value;

  const listingData = {
      title: title,
      description: description,
      tags: tags,
      media: media ? [media] : [], // Ensure media is an array
      endsAt: new Date(endsAt).toISOString() // Convert to ISO date format
  };

  try {
      const response = await fetch('https://v2.api.noroff.dev/auction/listings', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`, // Pass token in Authorization header
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(listingData) // Send the listing data as JSON
      });

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
