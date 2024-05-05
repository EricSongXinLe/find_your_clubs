import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Welcome from './components/welcomeModule';
import ModeSelector from './components/changeMode';
import SearchBar from './components/searchBar';

export default function App() {

  const [userName, setUserName] = useState('');
  const [selected, setSelected] = useState('recommendation'); // Tracks which button is selected

  // Simulating fetching user's name from a database
  useEffect(() => {
    // Fetching logic here, now just a dummy name
    setUserName('SB'); // Replace 'SB' with the actual fetching logic
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
      
      <footer id="citation"> 
        <a target="_blank" href="https://icons8.com/icon/e4NkZ7kWAD7f/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}