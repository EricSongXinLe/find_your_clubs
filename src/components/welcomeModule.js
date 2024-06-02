import React from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function Welcome({ userName }) {
  const navigate = useNavigate();

    const handleLogout = () => {
      window.history.replaceState({}, '')
      window.location.href = '/login';
      };

      const handlemyFav= () => {
        navigate(`/myfavclub`);
        };

    return (
      <div>
        <header>
          <h1>Find Your Clubs</h1></header>
      <div className="welcome-container">
        
        <h2>Welcome, {userName}!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        <button onClick={handlemyFav} className="FavButton">My Favourite Clubs</button>
      </div>
      </div>
    );
    
  }
  

export default Welcome;
