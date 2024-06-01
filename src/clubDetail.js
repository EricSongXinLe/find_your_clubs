import React, { useEffect, useState, useContext, act } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './clubDetail.css';
import { FaStar } from 'react-icons/fa';
import { UserContext } from './userContext';
import axios from "axios"

const ClubDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  console.log(userId);
  const [club, setClub] = useState([]);

  const [isFavorited, setIsFavorited] = useState(true);
  const transformClubData = (data) => {
    return {
        description: data.clubdescription,
        requirements: data.requirement,
        activitytime: data.activityTime,
    };
};

const fetchStudent = (data) => {
  return {
      favClubArr: data.favClubs
  };
};

  useEffect(() => {
    
    const fetchClubDetails = async () => {
      try {

        // console.log(search)
        await axios.get('http://localhost:8000/search', { params: { clubname: id } })
        .then(
            res=>{
              console.log(res.data);
              const transformedData = transformClubData(res.data);
              setClub(transformedData);
            }
        ).catch((e)=>
            console.log(e)
        ) 
      }
        catch (error) {
        console.error('Error occurred while fetching club details:', error);
      }

      //Added. May be wrong:
      try {

        // console.log(search)
        await axios.get('http://localhost:8000/favclub', { params: { username: userId } })
        .then(
            res=>{
              console.log(res.data);
              const studentData = fetchStudent(res.data);
              console.log(studentData);
              if(Array.isArray(studentData.favClubArr)){
                console.log(111111111);
              }else{
                console.log(222222222);
              }
              const idExists = studentData.favClubArr.includes(id);
              console.log(idExists);
              setIsFavorited(idExists);
            }
        ).catch((e)=>
            console.log(e)
        ) 
      }
        catch (error) {
        console.error('CANNOT find Fav Clubs', error);
      }
      //
    };


    fetchClubDetails();
  }, [id]);

  const handleButtonClick = () => {
    navigate('/application'); 
  };
  /*
//potential bug here!!!!
  const toggleFavorite = async () => {
    //console.log('${id}');
    const response = await fetch(`/favorite/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, favorite: !isFavorited }),
    });

    if (response.ok) {
      setIsFavorited(!isFavorited);
    }
  };
  */ 
 //Prev version. Now try the new version. 

 
 const toggleFavorite = async () => {
 //console.log(id);
 try{
        
  await axios.post("http://localhost:8000/favclubsupdate",{
      username, favClubs
  })
  .then(res=>{
      if(res.data=="exist"){
          alert("123456")
      }
      else if(res.data=="added"){
          alert("45678 added")
          history("/",{state:{username:id}})
      }
  })
  .catch(e=>{
      alert("An error occured")
      console.log(e);
  })
}
catch(e){
  console.log(e);
}
};


  return (
    <div className="club-details-container">
      <div className="star-icon" onClick={toggleFavorite}>
        <FaStar color={isFavorited ? 'yellow' : 'grey'} size={26} />
      </div>
      <div className="club-header">
        <h1 className="club-title">{id}</h1>
        <p className="club-requirements"><strong>Requirements:</strong> {club.requirements}</p>
        <p className="club-tag"><strong>Tag:</strong> {club.tag}</p>
      </div>
      <div className="club-image-container">
        <img src={club.image} alt="Club" className="club-image" />
      </div>
      <div className="club-description-container">
        <pre className="club-description">{club.description}</pre>
      </div>
      <div className="club-footer">
        <p className="club-application">
          <strong>Application:</strong> <a href={club.application} target="_blank" rel="noopener noreferrer">Apply Here</a>
        </p>
        <p className="club-activitytime"><strong>Activity Time:</strong> {club.activitytime}</p>
      </div>
      <button className="navigate-button" onClick={handleButtonClick}>Go to Application Page</button>
    </div>
  );
};

export default ClubDetails;
