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
            return;
        }

        relevantListings.forEach(listing => {
            // Check if there are any bids and display the highest one, otherwise display "No bids yet"
            const highestBid = listing.bids && listing.bids.length > 0 
                ? Math.max(...listing.bids.map(bid => bid.amount)) 
                : 'No bids yet';

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
                    <p>Current highest bid: ${highestBid !== 'No bids yet' ? '$' + highestBid : highestBid}</p>
                    <input type="number" id="bid-amount-${listing.id}" placeholder="Enter your bid" min="0">
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

// Function to place a bid
async function placeBid(listingId) {
    const bidInput = document.getElementById(`bid-amount-${listingId}`);
    const bidAmount = bidInput.value;

    if (!bidAmount || bidAmount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
    }

    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        alert("You need to be logged in to place a bid.");
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ amount: bidAmount })
        });

        if (!response.ok) {
            throw new Error("Failed to place bid");
        }

        alert("Bid placed successfully!");
        fetchListings();
    } catch (error) {
        console.error("Error placing bid:", error);
        alert("Error placing bid. Please try again.");
    }
}


