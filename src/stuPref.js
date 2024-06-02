import {useState} from "react";
import axios from "axios"
import "./stuPref.css"
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom"

const interests = ["ComSci", "Math", "Physics", "Data Science", "Economics", "Mechanical Engineering"];
const input_num = interests.length;

const input_titles = [];

const selections = ["year of graduation"];
const selection_titles = [];
selection_titles.push("What is your Year of Graduation?*");
const selection_num = selections.length;




function StudentPreference() {
  const location = useLocation();
  const history=useNavigate();
  const username = location.state.username;
  const userIsClubLeader = location.state.userIsClubLeader;
  async function saveAnswer(e){

    try{
        
        await axios.post("http://localhost:8000/addstupref",{
            username, interestArr
        })
        .then(res=>{
            if(res.data=="exist"){
                alert("Club already exists")
            }
            else if(res.data=="added"){
                alert("Preference added")
                history("/",{state:{username:username, userIsClubLeader:userIsClubLeader}})
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
}
  
  const [interestArr, setInterestArr] = useState([]);

  let option_list = [];

  for (let i = 0; i < input_num; i++) {
    option_list.push(<label><input type="checkbox" name="option" id={interests[i]} onChange={(e) => {
      const newArr = interestArr.slice()
      newArr.push(interests[i])
      setInterestArr(newArr)
    
    }}/> {interests[i]}</label>);
    
  }

  return (
  <>
    <div className="question-container">
        <div className="question">Select all your interests below</div>
        <div className="options">
            {option_list[0]}
            {option_list[1]}
            {option_list[2]}
            {option_list[3]}
            {option_list[4]}
            {option_list[5]}    
        </div>
        <input type="submit" onClick={saveAnswer} />
      
        </div>
  

  </>
  );
}

async function postAnswer(answer_list)
{
  try{  
    await axios.post("http://localhost:8000/apply",{
        answer_list
    })
    .then(res=>{
        if(res.data=="exist"){
            alert("You've already submitted the application")
        }
        else if(res.data=="added"){
            alert("Application submitted successfully")
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
}




export default StudentPreference;
// export default {Apply, Create};