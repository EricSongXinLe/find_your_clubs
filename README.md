# <img src="./src/images/logo.webp" width=40px> Find Your Clubs  <img src="./src/images/logo.webp" width=40px>

Confused about what all those clubs are about? Don't know where to apply? Don't worry, **Find Your Clubs** will help you navigate through various STEM clubs, providing detailed information about each. Additionally, you can directly apply to clubs through their individual pages. Most importantly, our website will recommend clubs based on your interests.

## TL;DR Deployment guide: (For detailed guide, please continue reading...)
```
git clone https://github.com/EricSongXinLe/find_your_clubs 
cd find_your_clubs/server
npm install
npx nodemon app.js
cd ..
npm start
```
## Table of Contents
- [Features](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#feature)
- [Technologies](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#technologies)
- [Setting Up](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#setting-up)
- [Authors](https://github.com/EricSongXinLe/find_your_clubs/tree/new-main?tab=readme-ov-file#authors)

## Key Features
### Student Accounts may...
+ ***Personalized Recommendations:*** As a student searching for clubs, our website will randomly suggest clubs based on the your interest tags. Always discover something new!
+ ***Smart Search:*** Allows users to search for clubs by name or associated tags. Find the club you want quickly!
+ ***Club Detail Page:*** See Detailed pages for each club, including descriptions, club image, meeting times, and a link to the club application forms.
+ ***Favourite Clubs*** Students can also set a club as their favourite in the Club Details Page, and revisit their favourite clubs later in `myfavclub` page.
+ ***Club Photo Gallery*** On the front page, the webpage will randomly pick 3 club photos to display and automatically switch between them. 

### Club Leader Accounts may...
+ ***Club Management:*** As Club Leaders, you may create and add your clubs to the database for the website to dynamically display.
+ ***Review Applications*** As Club Leaders, you may also view the different applications you received.

## Technologies
+ [React.js](https://react.dev/): Used for building the frontend.
+ [MongoDB](https://mongodb.com/): Used as our database to persist all the necessary user-input data.
+ [Node.js](https://nodejs.org/en):  JavaScript run-time environment for backend services

## Setup
In order to run Find Your Clubs locally, you need to install all the required dependencies.

### Prerequisites 
Before you begin, ensure you have installed the latest version of [Node.js](https://nodejs.org/en/download/package-manager/) and [MongoDB](https://www.mongodb.com/try/download/community).

To set up the **Find Your Clubs** application, follow these steps:

### Installation
Open terminal to set up the application 

#### Step 1 - Clone the applicaiton 

Clone the repository of the application from github and set to the find_your_clubs repository
```bash
git clone https://github.com/EricSongXinLe/find_your_clubs 
cd find_your_clubs
```

#### Step 2 (OPTIONAL) - Set up MongoDB Locally

For development purposes, the database for this project was deployed in another VPS instead of locally so all group members can share one database. If you want to change the database you want to connect to, you must modify line 2 of the ``mongo.js`` file from ``mongoose.connect("mongodb://admin:CS35L@110.40.138.15:27017/admin")`` to the database you want to connect to.

To deploy mongodb locally:  
First, download and install [MongoDB](https://www.mongodb.com/try/download/community). After that, issue the following command at your terminal/shell:   
```
mongod
```
Use the keyword ``use`` to switch between databases. For example ``use admin`` switches to the admin database.


#### Step 3 - Set up the Node.js backend
Set up the backend database with Nodemon
```bash
cd server
npx nodemon app.js
```

#### Step 4 - Set up frontend

Open another terminal to start the frontend while keep the  pervious terminal to run the backend

Set the directory to the frontend source and then install the dependencies 
```bash
cd find_your_clubs/src
npm install
```


#### Step 5 - Locally start the front end 
```bash
npm start
```



## Authors
Find Your Clubs was developed as a project for CS 35L taught by Professor Paul Eggert at UCLA in Spring 2024. 
Team member: Eric Song (@EricSongXinLe), Yike Shi (@Yik3), Bomin Wei (@David-BominWei), Zhiyi Chen (@gigichen880), Boyan Yu (@Samaritan001), Yingshi Ye (@yingshiye)
