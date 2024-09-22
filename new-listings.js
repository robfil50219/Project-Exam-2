document.getElementById('new-listing-form').addEventListener('submit', async function (event) {
    event.preventDefault(); 
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("You must be logged in to create a listing.");
      window.location.href = 'login.html'; 
      return;
    }
  
    // Collect form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const media = document.getElementById('media').value ? [document.getElementById('media').value] : [];
    const endDate = document.getElementById('end-date').value;
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          title: title,
          description: description,
          media: media,
          endsAt: new Date(endDate).toISOString(), 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create the listing.');
      }
  
      document.getElementById('listing-message').textContent = 'Listing created successfully!';
      window.location.href = 'listings.html'; 
    } catch (error) {
      console.error('Error creating listing:', error);
      document.getElementById('listing-message').textContent = 'Error creating the listing. Please try again.';
    }
  });
  