import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../userContext';
import { useNavigate } from "react-router-dom";
import ClubBlock from './clubBlock';
import axios from 'axios';
import './Fav.css'; 

const FavClubs = () => {
  const { userId} = useContext(UserContext); 
  const history=useNavigate();
  console.log(userId)
  const [favClubs, setFavClubs] = useState([]);
  const handleRedirect = () => {
    history("/",{state:{username:userId, userIsClubLeader:false}})
  };

  useEffect(() => {
    const fetchFavClubs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/favclub', { params: { username: userId } });
        console.log(res.data.favClubs)
        setFavClubs(res.data.favClubs);
      } catch (error) {
        console.error('Error fetching favorite clubs:', error);
      }

    };

    fetchFavClubs();
  }, [userId]);

  return (
    <div className="fav-clubs-container">
      <div className="close-button" onClick={handleRedirect}>X</div>
      <h1>{userId}'s Favorite Clubs</h1>
      <div className="club-box">
        {favClubs.map((club) => (
          <ClubBlock
            title = {club}
            id = {club}
            image={require('../images/logo.webp')}
          />
        ))}
      </div>
    </div>
  );
};

export default FavClubs;


