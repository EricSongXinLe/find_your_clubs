# <img src="./src/images/logo.webp" width=40px> Find Your Clubs  <img src="./src/images/logo.webp" width=40px>

Confused about what all those clubs are about? Don't know where to apply? Don't worry, **Find Your Clubs** will help you navigate through various STEM clubs, providing detailed information about each. Additionally, you can directly apply to clubs through their individual pages. Most importantly, our website will recommend clubs based on your interests.

## Table of Contents
- [Features](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#feature)
- [Technologies](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#technologies)
- [Setting Up](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#setting-up)
- [Authors](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#authors)

## Key Features
+ ***Club Management:*** Enables club leaders to manage and create their club page, and review applications
+ ***Club Pages:*** Detailed pages for each club, including descriptions, club image, meeting times, and application forms.
+ ***Personalized Recommendations:*** Suggests clubs based on the user’s tagged interests, with the ability to discover new clubs through refreshed recommendations.
+ ***Searchability:*** Allows users to search for clubs by name or associated tags.

## Technologies
+ React.js: Used for building the frontend.
+ MongoDB: Used for backend services and database management.
+ Node.js:  JavaScript run-time environment

## Setup
In order to run Find Your Clubs locally, you need to meet the prerequisites and install 

### Prerequisites 
Before you begin, ensure you have installed the latest version of [Node.js](https://nodejs.org/en/download/package-manager/).

To set up the **Find Your Clubs** application, follow these steps:

### Installation
Open terminal to set up the application 

#### Step 1 - Clone the applicaiton 

Clone the repository of the application from github and set to the find_your_clubs repository
```bash
git clone https://github.com/EricSongXinLe/find_your_clubs 
cd find_your_clubs
```

#### Step 2 - Set up backend
Set up the backend database with Nodemon
```bash
cd server
npx nodemon app.js
```


#### Step 3 - Set up frontend

Open another terminal to start the frontend while keep the  pervious terminal to run the backend

Set the diretory to the frontend source and then install the dependencies 
```bash
cd find_your_clubs/src
npm install
```


#### Step 4 - Locally start the application 
```bash
npm start
```

## Authors
Find Your Clubs was developed as a project for CS 35L taught by Professor Paul Eggert at UCLA in Spring 2024. 
Team member: Eric Song, Yike Shi, Bomin Wei, Zhiyi Chen, Boyan Yu, Yingshi Ye