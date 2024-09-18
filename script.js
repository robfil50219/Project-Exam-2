import { fetchAllListings, createNewListing, placeBidOnListing } from './api.js';

// Fetch and display auction listings
async function fetchListings() {
  try {
    const listings = await fetchAllListings();

    const auctionItemsContainer = document.querySelector('.auction-items');
    auctionItemsContainer.innerHTML = ''; // Clear previous listings

    listings.forEach(listing => {
      const auctionItem = `
        <div class="auction-item">
          <h3>${listing.title}</h3>
          <img src="${listing.media[0]?.url || ''}" alt="${listing.media[0]?.alt || 'No Image'}" />
          <p>${listing.description}</p>
          <p>Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
          <button onclick="placeBid('${listing.id}')">Place Bid</button>
        </div>
      `;
      auctionItemsContainer.innerHTML += auctionItem;
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

// Handle form submission for creating new listing
async function handleCreateListing(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
  const imageUrl = document.getElementById('image-url').value;
  const endsAt = new Date(document.getElementById('ends-at').value).toISOString();

  const listingData = {
    title,
    description,
    tags,
    media: [{ url: imageUrl, alt: title }],
    endsAt,
  };

  try {
    await createNewListing(listingData);
    fetchListings(); // Fetch updated listings
  } catch (error) {
    console.error('Error creating listing:', error);
  }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', fetchListings);
document.getElementById('create-listing-form').addEventListener('submit', handleCreateListing);
