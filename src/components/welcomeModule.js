import React from 'react';
import '../styles.css';

function Welcome({ userName }) {
    const handleLogout = () => {
      window.history.replaceState({}, '')
      window.location.href = '/login';
      };
    return (
      <div className="welcome-container">
        <h2>Welcome, {userName}!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    );
    
  }
  

export default Welcome;
