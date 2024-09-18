async function fetchListings() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auction/listings');
        const result = await response.json();
        const listings = result.data.slice(0, 8); // Limit to 8 listings
    
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

        initializeCarousel(); // Initialize the carousel after listings are rendered
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

function initializeCarousel() {
    const carouselContainer = document.querySelector('.auction-items');
    let currentIndex = 0;
    const items = carouselContainer.querySelectorAll('.auction-item');
    const totalItems = items.length;

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    document.querySelector('#next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    });

    document.querySelector('#prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
    });

    showItem(currentIndex); // Show the first item on page load
}

document.addEventListener('DOMContentLoaded', fetchListings);
