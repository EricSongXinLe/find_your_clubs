import React from 'react';
import '../styles.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome({ userName, isLeader }) {
  const [logOutText, setLogOutText] = useState('Logout');
  const navigate = useNavigate();
    useEffect(() => {
      if (userName === "Guest") {
        setLogOutText('Login');
      }
    }, [userName]);
    const handleLogout = () => {
      window.history.replaceState({}, '')
      window.location.href = '/login';
      };

      const handlemyFav= () => {
        navigate(`/myfavclub`);
        };
      
      const viewApp= () => {
        navigate(`/ViewApp`,{state:{username:userName, userIsClubLeader:true}})
      }

    return (
      <div>
        <header>
          <h1>Find Your Clubs</h1></header>
      <div className="welcome-container">
        
      <div className="welcome-header">
          <h2>Welcome, {userName}!</h2>
          <button onClick={handleLogout} className="logout-button">{logOutText}</button>
        </div>
        {isLeader ? <button onClick={viewApp} className="FavButton">View Application</button> : 
        <button onClick={handlemyFav} className="FavButton">My Favourite Clubs</button>}
        
      </div>
      </div>
    );
    
  }
  

export default Welcome;
