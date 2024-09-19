// Function to place a bid
async function placeBid(listingId) {
    const bidInput = document.getElementById(`bid-amount-${listingId}`);
    const bidAmount = bidInput.value;

    if (!bidAmount || bidAmount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
    }

    // Retrieve the authentication token (assuming it's stored in localStorage)
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
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify({ amount: bidAmount })
        });

        if (!response.ok) {
            throw new Error("Failed to place bid");
        }

        alert("Bid placed successfully!");
        fetchListings(); // Optionally, refresh listings to reflect the new bid
    } catch (error) {
        console.error("Error placing bid:", error);
        alert("Error placing bid. Please try again.");
    }
}
