import React, { useEffect, useState } from "react";
import './viewApp.css'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"

function ViewApp() {
    /*
    const [applications, setApplications] = useState([]);

    const getApplications = () => {
        fetch('http://localhost:8000/application')
        .then(response => response.json())
        .then(data => setApplications(data))
    }

    useEffect(() => {
        getApplications();
    }, []);
    */
   var clubsCreated = []
   var clubAnswer = []
   var currAnswer = []
    console.log("12345")
    const history = useNavigate();
    const location = useLocation();
    const username = location.state?.username
    console.log(username)

    const handleRedirect = () => {
        history("/",{state:{username:username, userIsClubLeader:true}})
      };
    
    const fetchStudent = (data) => {
        return {
            favClubArr: data.favClubs
        };
      };

    async function fetchCreateClub(){
  try {

    // console.log(search)
    await axios.get('http://localhost:8000/favclub', { params: { username: username } })
    .then(
        res=>{
          const studentData = fetchStudent(res.data);
          clubsCreated = studentData.favClubArr
          console.log("123",clubsCreated)
        }
    ).catch((e)=>
        console.log(e)
    ) 
  }
    catch (error) {
    console.error('CANNOT find Fav Clubs', error);
  }
}

async function fetchFormforaClub(clubname){
    try {
  
      console.log("This is",clubname)
      await axios.get('http://localhost:8000/viewclubApp', { params: { clubName: clubname } })
      .then(
          res=>{
            clubAnswer = res.data;
            console.log("456",clubAnswer);
          }
      ).catch((e)=>
          console.log(e)
      ) 
    }
      catch (error) {
      console.error('CANNOT find Fav Clubs', error);
    }
}
useEffect(() => {
    const fetchData = async () => {
      await fetchCreateClub();
      console.log(333, clubsCreated); // This will now run after fetchCreateClub has completed
      for (let i = 0; i < clubsCreated.length; i++) {
        const currClub = clubsCreated[i];
        console.log(i,currClub);
        await fetchFormforaClub(currClub);
        console.log(clubAnswer.length);
        for(let j = 0; j<clubAnswer.length; j++){
            console.log("Here!")
            currAnswer= clubAnswer[j].answers;
            console.log("Hi",j,currAnswer);
        }
    }
    console.log(clubsCreated); // correct here

    };

    fetchData();
    
  }, [username]);

  

}



export default ViewApp;