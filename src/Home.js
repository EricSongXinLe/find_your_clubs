import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useLocation } from "react-router-dom";
import AddClub from './AddClub';
import StudentBlock from './components/studentBlock';
import Welcome from './components/welcomeModule';
import { useContext } from 'react';
import { UserContext } from './userContext';

/*Now there are bugs in giving the whole array as a parameter. CHECK that later!*/
export default function Home() {

  const location = useLocation();
  const username = location.state?.username || "Guest";
  // console.log("Test", username)
  const usertype = location.state?.userIsClubLeader ||  false;
  const [selected, setSelected] = useState('recommendation'); // Tracks which button is selected

  const { setUserId } = useContext(UserContext);
  useEffect(() => {
    // Fetch or set the userId
    const fetchedUserId = username; 
    setUserId(fetchedUserId);
  }, [setUserId]);

  return (
    <div>
      
      <header>
        <h1>Find Your Clubs</h1>
      </header>
      <Welcome userName={username}/>
      <div class ="web_page_container">
        {usertype ? <AddClub /> : <StudentBlock username={username}/>}
      </div>
      <footer id="citation"> 
        <a target="_blank" h="https://icons8.com/icon/e4NkZ7kWAD7f/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}