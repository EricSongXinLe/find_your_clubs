import {useState} from "react";
import axios from "axios"
// useless comment

// input questions
const inputs = ["name", "email", "gender", "birthday"];
const input_num = inputs.length;
const input_hints = [];
const input_titles = [];
for (let i = 0; i < input_num; i++)
{
  input_hints.push("Enter your " + inputs[i] + " here");
  input_titles.push("What is your " + inputs[i] + "?*");
}

// selection questions
const selections = ["year of graduation"];
const selection_titles = [];
selection_titles.push("What is your Year of Graduation?*");
const selection_num = selections.length;

// supplementary questions
let supplementaries = ["A unique question*", "Another unique question*"];
supplementaries = getCreation();
const supplementary_num = supplementaries.length;


function Apply() {

  let titles = [];
  let inboxes = [];
  
  for (let i = 0; i < input_num; i++) {
    titles.push(<p className="text" id={"iTitle" + String(i)}>{input_titles[i]}</p>)
    inboxes.push(<input type="text" id={inputs[i]} placeholder={input_hints[i]}></input>);
  }

  // let supplementaries = db.user.find({clubname: {clubname}}, {supplementaries: 1});
  
  for (let i = 0; i < 3; i++)
  {
    // input_titles.push("Supplementary Question " + String(i+1) + "*");
    if (i >= supplementary_num)
    {
      // no question provided
      titles.push(<a></a>);
      inboxes.push(<a></a>);
    }
    else
    {
      titles.push(<p className="text" id={"sTitle" + String(i)}>{supplementaries[i]}</p>)
      inboxes.push(<input type="text" id={"supplementary" + String(i)} placeholder="Enter your answer"></input>);
    }
  }

  document.body.style.overflow = "visible";

  return (
  <>
    <div className="row">
      {titles[0]}
      {inboxes[0]}
    </div>
    <div className="row">
      {titles[1]}
      {inboxes[1]}
    </div>
    <div className="row">
      {titles[2]}
      {inboxes[2]}
    </div>
    
    <div className="row">
      <a name="text" id="sTitle">{selection_titles[0]}</a><a> </a>
      <select name="drop1" id="Select1">
        <option value="select">select</option>
        <option value="2024">2024</option>  
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
      </select>
    </div>

    <div className="row">
      {titles[3]}
      {inboxes[3]}
    </div>

    <div className="row">
      {titles[4]}
      {inboxes[4]}
    </div>

    <div className="row">
      {titles[5]}
      {inboxes[5]}
    </div>

    <div className="row">
      {titles[6]}
      {inboxes[6]}
    </div>
    
    <button id="submit application button" onClick={saveAnswer}>Submit</button>
    <p id="texto"></p>
  </>
  );
}

function saveAnswer() {
  let finished = true;

  // check for any unanswered required input question
  for (let i = 0; i < input_num; i++)
  {
    let question = document.getElementById("iTitle" + String(i));
    let text_box = document.getElementById(inputs[i]);
    if (text_box.value == "") // if empty
    {
      question.innerHTML = input_titles[i] + " Required";
      question.style.color = '#FF5733';
      finished = false;
    }
    else if (question.innerHTML != input_titles[i]) // revert to normal
    {
      question.style.color = '#000000';
      question.innerHTML = input_titles[i];
    }
  }

  // check for any unanswered required selection question
  for (let i = 0; i < selection_num; i++)
  {
    let select = document.getElementById("sTitle");
    let selection = document.getElementById("Select1");
    if (selection.value == "select") // if no selection
    {
      select.style.color='#FF5733';
      select.innerHTML = selection_titles[i] + " Required";
      finished = false;
    }
    else if (select.innerHTML != selection_titles[i]) // revert to normal
    {
      select.style.color='#000000';
      select.innerHTML = selection_titles[i];
    }
  }

  // check for any unanswered required supplementary question
  for (let i = 0; i < supplementary_num; i++)
  {
    let question = document.getElementById("sTitle" + String(i));
    let text_box = document.getElementById("supplementary" + String(i));
    if (text_box.value == "") // if empty
    {
      question.innerHTML = supplementaries[i] + " Required";
      question.style.color = '#FF5733';
      finished = false;
    }
    else if (question.innerHTML != supplementaries[i]) // revert to normal
    {
      question.style.color = '#000000';
      question.innerHTML = supplementaries[i];
    }
  }

  // don't process if unfinished
  if (!finished)
    return;

  let answers = [];
  let supplementary_answers = [];

  // add input questions' answers to list
  for (let i = 0; i < input_num; i++)
  {
    let text_box = document.getElementById(inputs[i]);
    answers.push(text_box.value);
  }

  // add selection questions' answers to list
  for (let i = 0; i < selection_num; i++)
  {
    let selection = document.getElementById("Select1");
    answers.push(selection.value);
  }

  // add supplementary questions' answers to list
  for (let i = 0; i < supplementary_num; i++)
  {
    let text_box = document.getElementById("supplementary" + String(i));
    supplementary_answers.push(text_box.value);
  }

  postAnswer(answers, supplementary_answers); // send answers to backend database

  // Happy Birthday
  document.getElementById('texto').innerHTML = "Happy Birthday".concat(
    " ", document.getElementById(inputs[0]).value);

}


async function postAnswer(answers, supplementary_answers)
{
  try{  
    await axios.post("http://localhost:8000/application",{
        answers, supplementary_answers
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


async function getCreation(e){
  e.preventDefault();

  try{

      await axios.post("http://localhost:8000/club_search",{
          clubname
      })
      .then(res=>{
          if(res.data){
            alert("Club found")
            return res.data["supplementary_questions"];
          }
          else{
            alert("Club not found")
          }
      })
      .catch(e=>{
        alert("An error occurred")
        console.log(e);
      })

  }
  catch(e){
    console.log(e);

  }

}



export default Apply;
// export default {Apply, Create};