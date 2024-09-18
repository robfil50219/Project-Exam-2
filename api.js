const baseUrl = 'https://v2.api.noroff.dev/auction'; 

// Fetch all auction listings
export async function fetchAllListings() {
  try {
    const response = await fetch(`${baseUrl}/listings`);
    if (!response.ok) {
      throw new Error('Error fetching listings');
    }
    const data = await response.json();
    return data.data; // Assuming data contains the listings in `data.data`
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

// Create a new auction listing
export async function createNewListing(listingData) {
  try {
    const response = await fetch(`${baseUrl}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });
    if (!response.ok) {
      throw new Error('Error creating listing');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
}

// Place a bid on a listing
export async function placeBidOnListing(listingId, bidAmount) {
  try {
    const response = await fetch(`${baseUrl}/listings/${listingId}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: bidAmount }),
    });
    if (!response.ok) {
      throw new Error('Error placing bid');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
}
