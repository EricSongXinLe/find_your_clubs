import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useLocation } from "react-router-dom";
import AddClub from './AddClub';
import StudentBlock from './components/studentBlock';
import Welcome from './components/welcomeModule';

/*Now there are bugs in giving the whole array as a parameter. CHECK that later!*/
export default function Home() {

  const location = useLocation();
  const username = location.state?.username || "Guest";
  const usertype = location.state?.userIsClubLeader ||  false;
  const [selected, setSelected] = useState('recommendation'); // Tracks which button is selected
  const [clubs, setClubs] = useState([
    // Dummy data for initial setup
    { id: 1, image: 'image1.jpg', title: 'Club One', description: 'Description of Club One' },
    { id: 2, image: 'image2.jpg', title: 'Club Two', description: 'Description of Club Two' },
    //Delete this part and extract data from back-end!!!
  ]);
  


  useEffect(() => {
  }, []);

  
  return (
    <div>
      
      <header>
        <img id="logo" src={require("./images/logo.webp")} alt="logo"/>
        <h1>Find Your Clubs</h1>
      </header>
      <Welcome userName={username}/>
      <div>
        {usertype ? <AddClub /> : <StudentBlock />}
      </div>
      <footer id="citation"> 
        <a target="_blank" h="https://icons8.com/icon/e4NkZ7kWAD7f/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}