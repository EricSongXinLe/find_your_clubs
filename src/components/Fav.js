import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../userContext';
import { useNavigate } from "react-router-dom";
import ClubBlock from './clubBlock';
import axios from 'axios';
import './Fav.css'; 

const FavClubs = () => {
  const { userId} = useContext(UserContext); 
  const history=useNavigate();
  const [favClubs, setFavClubs] = useState([]);
  const [clubs, setClubs] = useState([]);
  const handleRedirect = () => {
    history("/",{state:{username:userId, userIsClubLeader:false}})
  };

  useEffect(() => {
    const fetchFavClubs = async () => {
      try {
        const res = await axios.get('https://findyourclubs.ericsong.cn:8000/favclub', { params: { username: userId } });
        setFavClubs(res.data.favClubs);
        var clubinfo = []
        for (let i = 0; i < res.data.favClubs.length; i++) {
          await axios.get('https://findyourclubs.ericsong.cn:8000/search', { params: { clubname: res.data.favClubs[i] } })
          .then((res) => {
            var tmp = {};
            tmp = {title: res.data.clubname, description: res.data.clubdescription, image: `data:image/jpeg;base64,${Buffer.from(res.data.clubimg).toString('base64')}`};
            clubinfo.push(tmp);
          }
          )
          .catch((err) => {
            console.log(err);
          }
          );
        }
        setClubs(clubinfo);
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
        {clubs.map((club) => (
          <ClubBlock
            title = {club.title}
            id = {club.title}
            image={club.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FavClubs;


