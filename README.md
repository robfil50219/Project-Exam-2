Auctionary - Bid Smart, Win Big
Auctionary is a user-friendly auction platform where individuals can browse, bid, and list auction items with ease. The platform showcases auctions through a dynamic carousel of featured items, includes a comprehensive search system, and allows users to create new listings.

Features
Featured Auctions Carousel: Highlighted items are displayed in a carousel, making it easy for users to browse.
Search Functionality: Users can search for auctions using keywords, with real-time filtering of results.
Bid Smart: Users can place bids on active auction listings.
Create New Listings: Registered users can create new auction listings through a simple form.
Responsive Design: Optimized for various screen sizes, ensuring seamless access across all devices.
Technologies Used
HTML5: Structure and layout of the platform.
CSS3: Styling for a responsive and modern look.
JavaScript (ES6+): Handles dynamic content, interactions, and API integrations.
API: The application utilizes the Noroff Auction API for fetching and creating auction listings.
Netlify: For deployment and hosting.
Getting Started
Prerequisites
A modern web browser.
Internet access to connect with the external API.
Installation
Clone the repository:

bash
Kopier kode
git clone https://github.com/your-username/auctionary.git
cd auctionary
Open the index.html file in your browser to start the application. 
API Integration
The application connects to the Noroff Auction API for auction data. The following endpoints are used:

GET /auction/listings: Fetches all active listings.
POST /auction/listings: Allows users to create a new auction listing.
For more details on the API, visit the Noroff API Documentation.

Functionality
Carousel
The carousel dynamically displays up to 8 featured auction items. Users can navigate through them using "Previous" and "Next" buttons.

Search
A search bar allows users to filter auctions by title or description, with results dynamically updated based on user input.

Bidding
Each auction listing provides a "Place Bid" button, allowing users to bid on available items. Future updates will expand on the bidding functionality.

Create New Listing
Registered users can create new auction listings through an easy-to-use form, providing details like title, description, and an image URL.

Deployment
This project is deployed on Netlify. You can visit the live version here: Auctionary.

Contributing
We welcome contributions! To contribute:

Fork the repository.
Create a new branch:
bash
Kopier kode
git checkout -b feature-branch
Commit your changes:
bash
Kopier kode
git commit -m 'Add a new feature'
Push to the branch:
bash
Kopier kode
git push origin feature-branch
Open a pull request.
License
This project is licensed under the MIT License.

Contact
For any questions or feedback, feel free to reach out at: robfil50219@stud.noroff.no.


