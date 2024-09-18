async function fetchListings() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auction/listings'); 
        const result = await response.json();
        const listings = result.data;

        const auctionItemsContainer = document.querySelector('.auction-items');
        auctionItemsContainer.innerHTML = ''; // Clear previous listings

        // Filter for relevant listings (e.g., only active listings with media)
        const relevantListings = listings.filter(listing => {
            const hasMedia = listing.media.length > 0; // Has at least one media
            const isActive = new Date(listing.endsAt) > new Date(); // Not expired
            return hasMedia && isActive;
        });

        if (relevantListings.length === 0) {
            auctionItemsContainer.innerHTML = '<p>No relevant listings available.</p>';
        }

        relevantListings.forEach(listing => {
            const auctionItem = `
                <div class="auction-item">
                    <h3>${listing.title}</h3>
                    ${listing.media.length > 0 ? 
                        `<img src="${listing.media[0]?.url}" alt="${listing.media[0]?.alt || 'Image'}" />` 
                        : ''
                    }
                    <p>${listing.description || 'No description available.'}</p>
                    <p>Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
                    <p>Bids: ${listing._count.bids}</p>
                    <button onclick="placeBid('${listing.id}')">Place Bid</button>
                </div>
            `;
            auctionItemsContainer.innerHTML += auctionItem;
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        document.querySelector('.auction-items').innerHTML = '<p>Error loading listings. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchListings);
