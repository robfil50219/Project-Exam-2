# Auctionary - Bid Smart, Win Big

Auctionary is an auction-based web platform where users can browse, bid, and list auction items seamlessly. This project integrates a modern auction listing functionality, with a carousel to highlight featured items and an intuitive search system to find relevant listings.

## Features
- **Carousel** for showcasing featured auction listings.
- **Search functionality** to help users filter auctions by keyword.
- **Start Bidding button** that redirects to all listings.
- **Dynamic auction listings** fetched from an external API.
- **Create new auction listing functionality**.
- **Responsive Design** for accessibility on different devices.

## Technologies Used
- **HTML5** for markup.
- **CSS3** for styling.
- **JavaScript (ES6+)** for dynamic functionality.
- **External API** for auction data: `https://v2.api.noroff.dev/auction/listings`
- **Netlify** for deployment.

## Getting Started

### Prerequisites
Make sure you have a modern web browser installed. You will also need an internet connection to fetch data from the API.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/auctionary.git
   cd auctionary
2. Open the index.html file in your browser to run the project.


   File Structure
├── css/
│   └── styles.css           # Styling for the app
├── js/
│   ├── carousel.js          # Logic for carousel
│   ├── search.js            # Logic for searching listings
│   ├── api.js               # API interaction logic
│   └── script.js            # Main app logic
├── index.html               # Main webpage structure
├── README.md                # Project documentation
└── assets/
    └── icons/               # Icons used in the project

API Integration
All listings are fetched dynamically from the Noroff Auction API. We make use of the following endpoints:

GET /auction/listings - Fetches all auction listings.
POST /auction/listings - Allows creating new listings.
For more information, visit the Noroff API documentation.

Functionality
Carousel
The carousel feature dynamically loads up to 8 featured auction items and allows users to navigate between them using "Previous" and "Next" buttons.

Search
Users can search for auctions by title or description. The results are dynamically displayed based on their search input.

Bidding
Each auction listing has a "Place Bid" button, which will allow users to bid on the item (functionality for handling bidding logic should be expanded in future iterations).

Create New Listing
Users can create new auction listings by filling out a form (available on the platform) and submitting the necessary details.

Deployment
This project is deployed using Netlify. You can view the live project at:

https://auctionarygo.netlify.app

Contributing
Fork the repository
Create a feature branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add a feature')
Push to the branch (git push origin feature-branch)
Open a pull request
License
This project is licensed under the MIT License.

Contact
For any questions or feedback, feel free to reach out via [robfil50219@stud.noroff.no].
