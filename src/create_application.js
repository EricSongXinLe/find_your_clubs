import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

import './createapp.css'

// input questions
const inputs = ["name", "email", "gender", "birthday"];

// selection questions
const selections = ["year of graduation"];


function Create() {
  // a string that lists out the general questions
  const location = useLocation();
  const history = useNavigate();
  const username = location.state?.username || "Guest";
  const clubName = location.state?.clubname || "Error";

  let question_str = inputs[0];
  for (let i = 1; i < inputs.length; i++)
  {
    question_str += ", " + inputs[i];
  }

  for (let i = 0; i < selections.length; i++)
  {
    question_str += ", " + selections[i];
  }
  // console.log(question_str);

  async function saveForm() {
    // gather supplementary questions from input boxes
    let supplementary_questions = []
    for (let i = 1; i <= 3; i++)
    {
      let created_question = document.getElementById("club designed question " + String(i) + " input box");
      if (!(created_question))
        return;
  
      if (created_question.value == "") // only add the boxes with answer
        continue;
      supplementary_questions.push(created_question.value);
    }
  
    // send supplementary question lists to database
    postForm(clubName, supplementary_questions);
    history("/",{state:{username:username, userIsClubLeader:true}})
  }

  return (
    <div className="Container">
    <div className="welcome info">
      <h2>The following general questions will be included in the application form:</h2>
      <p>{question_str}</p>
      <h2>Please enter at most three additional questions you wish your applicants to answer.</h2>
    </div>

    <div className="club designed question 1">
      <p>Question 1</p>
      <input className="inputBox"type="text" name="" id="club designed question 1 input box" placeholder="Please input question 1"></input>
    </div>

    <div className="club designed question 2">
      <p>Question 2</p>
      <input className="inputBox" type="text" name="" id="club designed question 2 input box" placeholder="Please input question 2, or leave it blank if you club doesn't need it."></input>
    </div>

    <div className="club designed question 3">
      <p>Question 3</p>
      <input className="inputBox" type="text" name="" id="club designed question 3 input box" placeholder="Please input question 3, or leave it blank if you club doesn't need it."></input>
    </div>

    <button id="finish creation button" onClick={saveForm}>Finish</button>

  </div>
  );
}



async function postForm(clubName, supplementary_questions)
{
  try{  
    await axios.post("http://localhost:8000/create",{
        clubName, supplementary_questions
    })
    .then(res=>{
        if(res.data=="exist"){
            alert("You've already submitted the created questions")
        }
        else if(res.data=="notexist"){
            alert("Created questions submitted successfully")
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

export default Create