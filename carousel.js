let currentSlide = 0;
const numOfSlides = 8; // Show 8 listings

async function fetchFeaturedListings() {
  try {
    const response = await fetch('https://v2.api.noroff.dev/auction/listings');
    const result = await response.json();
    const listings = result.data;

    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = ''; // Clear previous listings

    // Limit to 8 listings for the carousel
    const featuredListings = listings
      .filter(listing => listing.media.length > 0 && new Date(listing.endsAt) > new Date())
      .slice(0, numOfSlides);

    if (featuredListings.length === 0) {
      carousel.innerHTML = '<p>No featured listings available.</p>';
    }

    featuredListings.forEach(listing => {
      const auctionItem = `
        <div class="carousel-item">
          <h3>${listing.title}</h3>
          <img src="${listing.media[0]?.url || 'default-image.jpg'}" alt="${listing.media[0]?.alt || 'No Image'}" />
          <p>${listing.description || 'No description available.'}</p>
          <p>Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
          <p>Bids: ${listing._count.bids}</p>
          <button onclick="placeBid('${listing.id}')">Place Bid</button>
        </div>
      `;
      carousel.innerHTML += auctionItem;
    });

    // Initialize the first slide
    showSlide(currentSlide);
  } catch (error) {
    console.error('Error fetching featured listings:', error);
    document.querySelector('.carousel').innerHTML = '<p>Error loading listings. Please try again later.</p>';
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;

  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Add event listeners for carousel controls (if needed)
document.querySelector('#next-slide').addEventListener('click', () => {
  currentSlide++;
  showSlide(currentSlide);
});

document.querySelector('#prev-slide').addEventListener('click', () => {
  currentSlide--;
  showSlide(currentSlide);
});

// Load featured listings on page load
document.addEventListener('DOMContentLoaded', fetchFeaturedListings);
