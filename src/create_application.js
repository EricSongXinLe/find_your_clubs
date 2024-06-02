import axios from "axios"

// input questions
const inputs = ["name", "email", "gender", "birthday"];
const input_num = inputs.length;
const input_titles = [];
for (let i = 0; i < input_num; i++)
  input_titles.push("What is your " + inputs[i] + "?*");

// selection questions
const selections = ["year of graduation"];
const selection_titles = [];
selection_titles.push("What is your Year of Graduation?*");
const selection_num = selections.length;


function Create() {
  // a string that lists out the general questions
  let question_str = inputs[0];
  for (let i = 1; i < input_num; i++)
  {
    question_str += ", " + inputs[i];
  }

  for (let i = 0; i < selection_num; i++)
  {
    question_str += ", " + selections[i];
  }
  // console.log(question_str);

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

function saveForm() {
  // gather supplementary questions from input boxes
  if (document.getElementById("welcome info"))
    document.getElementById("welcome info").color = '#FF5733';
  let supplementary_questions = []
  for (let i = 1; i <= 3; i++)
  {
    let created_question = document.getElementById("club designed question " + String(i) + " input box");
    if (created_question.value == "") // only add the boxes with answer
      continue;
    supplementary_questions.push(created_question.value);
  }

  // generate the general question list
  let general_questions = structuredClone(input_titles);
  general_questions.splice(3, 0, selection_titles[0]);

  // send both question lists to database
  postForm("ABC", general_questions, supplementary_questions);
}

async function postForm(clubName, general_questions, supplementary_questions)
{
  try{  
    await axios.post("http://localhost:8000/create",{
        clubName, general_questions, supplementary_questions
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