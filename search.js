document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-btn').addEventListener('click', searchListings);
  
    // Enable search by pressing "Enter" key
    document.getElementById('search-input').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchListings();
      }
    });
  });
  
  async function searchListings() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
  
    if (!searchTerm) {
      alert("Please enter a search term");
      return;
    }
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/listings');
      const result = await response.json();
      const listings = result.data;
  
      const auctionItemsContainer = document.querySelector('.auction-items');
      auctionItemsContainer.innerHTML = ''; // Clear previous listings
  
      // Filter listings based on search term
      const filteredListings = listings.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm) || 
        listing.description.toLowerCase().includes(searchTerm)
      );
  
      if (filteredListings.length > 0) {
        filteredListings.forEach(listing => {
          const auctionItem = `
            <div class="auction-item">
              <h3>${listing.title}</h3>
              <img src="${listing.media[0]?.url || 'default-image.jpg'}" alt="${listing.media[0]?.alt || 'No Image'}" />
              <p>${listing.description}</p>
              <p>Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
              <p>Bids: ${listing._count.bids}</p>
              <button onclick="placeBid('${listing.id}')">Place Bid</button>
            </div>
          `;
          auctionItemsContainer.innerHTML += auctionItem;
        });
      } else {
        auctionItemsContainer.innerHTML = '<p>No listings found.</p>';
      }
    } catch (error) {
      console.error('Error searching listings:', error);
    }
  }
  