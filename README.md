## Find Your Clubs

Confused about what all those clubs are about? Don't know where to apply? Don't worry, **Find Your Clubs** will help you navigate through various STEM clubs, providing detailed information about each. Additionally, you can directly apply to clubs through their individual pages. Most importantly, our website will recommend clubs based on your interests.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the latest version of [Node.js](https://nodejs.org/en/download/package-manager/).

### Setting Up

To set up the **Find Your Clubs** application, follow these steps:

```bash
# Clone the repository
git clone https://github.com/EricSongXinLe/find_your_clubs

# Navigate to the project directory
cd find_your_clubs

# Install dependencies
npm install

# Setup the backend database with Nodemon (if needed)
npx nodemon app.js

# Start the application
npm start
```

### Key Features
+ Account Access: Users must log in to access all information. New users can create an account by clicking the sign-up link. Accounts are categorized into student and club leader roles.
+ Club Management: Club leaders can create club pages and applications once logged in and can view submitted applications.
+ Dynamic Home Page: Displays clubs based on the user’s interest tags with the ability to refresh the page to see different clubs.
+ Search Functionality: Users can search for clubs by name and/or tags.
+ Favorites: Users can favorite or unfavorite clubs.
+ Club Pages: Each club has its own page displaying a description, meeting time, and a link to the application form.

### Built With
+ React: Used for building the frontend.
+ MongoDB: Used for backend services and database management.

