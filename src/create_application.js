import axios from "axios"

const inputs = ["name", "email", "gender", "birthday"];
const input_num = inputs.length;
const selections = ["year of graduation"];
const selection_num = selections.length;



function Create() {
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
  let creations = []
  for (let i = 1; i <= 3; i++)
  {
    let created_question = document.getElementById("club designed question " + String(i) + " input box");
    if (created_question.value == "")
      continue;
    creations.push(created_question.value);
  }

  postForm(creations);
}

async function postForm(creations)
{
  try{  
    await axios.post("http://localhost:8000/create",{
        creations
    })
    .then(res=>{
        if(res.data=="exist"){
            alert("You've already submitted the created questions")
        }
        else if(res.data=="added"){
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