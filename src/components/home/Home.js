import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';


import Welcome from './components/welcomeModule';
import ModeSelector from './components/changeMode';
import ClubBlock from './components/clubBlock';
import SearchBar from './components/searchBar';
import FilterBar from './components/filterBar';

export default function Home() {

  const [userName, setUserName] = useState('');
  const [selected, setSelected] = useState('recommendation'); // Tracks which button is selected

  const location=useLocation()
  const tags = ['Publish Time', 'Experience Needed', 'Popular'];


  // Simulating fetching user's name from a database
  useEffect(() => {
    // Fetching logic here, now just a dummy name
    setUserName(location.state.id); // Replace 'SB' with the actual fetching logic
  }, []);

  
  return (
    <div>
      
      <header>
        <img id="logo" src={require("./images/logo.webp")} alt="logo"/>
        <h1>Find Your Clubs</h1>
      </header>
      <Welcome userName={userName}/>
      <ModeSelector m_mode={selected} m_setMode={setSelected}/>
      {selected==='search'&& <SearchBar />}  
      
      <FilterBar tags={tags}/>

      <div className="club-box">
        <ClubBlock image={require('./images/logo.webp')} title="Club 1" description="Description of Club 1" />
        <ClubBlock image={require('./images/logo.webp')} title="Club 2" description="Description of Club 2" />
        <ClubBlock image={require('./images/logo.webp')} title="Club 3" description="Description of Club 3" />
      </div>
      <footer id="citation"> 
        <a target="_blank" h="https://icons8.com/icon/e4NkZ7kWAD7f/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}