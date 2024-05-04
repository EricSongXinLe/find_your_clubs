import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Welcome from './components/welcomeModule';

import SearchBar from './components/searchBar';

export default function App() {

  const [userName, setUserName] = useState('');

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
      <SearchBar />
      <footer id="citation"> 
        <a target="_blank" href="https://icons8.com/icon/e4NkZ7kWAD7f/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}