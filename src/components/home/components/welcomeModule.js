import React from 'react';
import '../styles.css';

function Welcome({ userName }) {
    const handleLogout = () => {
        alert('User logged out');
        // Implement actual logout logic here, e.g., clearing user session, redirecting, etc.
      };
    return (
      <div className="welcome-container">
        <h2>Welcome, {userName}!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    );
    
  }
  

export default Welcome;
