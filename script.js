async function fetchListings() {
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/listings'); 
      const result = await response.json();
      const listings = result.data;
  
      const auctionItemsContainer = document.querySelector('.auction-items');
      auctionItemsContainer.innerHTML = ''; // Clear previous listings
  
      listings.forEach(listing => {
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
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchListings);
  