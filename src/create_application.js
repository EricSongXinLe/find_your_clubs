import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

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
  console.log("I get the Club Name: ",clubName);
  console.log("Username:", username);

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
    console.log("Name to back:",clubName);
    console.log("questions:",supplementary_questions);
    postForm(clubName, supplementary_questions);
    history("/",{state:{username:username, userIsClubLeader:true}})
  }

  return (
  <>
    <div className="welcome info">
      <p>General questions provided:</p>
      <p>{question_str}</p>
      <p>Please enter at most three questions you wish your applicants to answer.</p>
    </div>

    <div className="club designed question 1">
      <p>Question 1</p>
      <input type="text" name="" id="club designed question 1 input box" placeholder="First Question"></input>
    </div>

    <div className="club designed question 2">
      <p>Question 2</p>
      <input type="text" name="" id="club designed question 2 input box" placeholder="Second Question"></input>
    </div>

    <div className="club designed question 3">
      <p>Question 3</p>
      <input type="text" name="" id="club designed question 3 input box" placeholder="Third Question"></input>
    </div>

    <button id="finish creation button" onClick={saveForm}>Finish</button>

  </>
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