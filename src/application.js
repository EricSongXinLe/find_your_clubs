import {useState} from "react";
import axios from "axios"

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
const supplementary_num = supplementaries.length;

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

  let answer_list = [];
  let supplementary_answer_list = [];

  // add input questions' answers to list
  for (let i = 0; i < input_num; i++)
  {
    let text_box = document.getElementById(inputs[i]);
    answer_list.push(text_box.value);
  }

  // add selection questions' answers to list
  for (let i = 0; i < selection_num; i++)
  {
    let selection = document.getElementById("Select1");
    answer_list.push(selection.value);
  }

  // add supplementary questions' answers to list
  for (let i = 0; i < supplementary_num; i++)
  {
    let text_box = document.getElementById("supplementary" + String(i));
    supplementary_answer_list.push(text_box.value);
  }

  postAnswer(answer_list, supplementary_answer_list); // send answers to backend database

  // Happy Birthday
  document.getElementById('texto').innerHTML = "Happy Birthday".concat(
    " ", document.getElementById(inputs[0]).value);

}

function Apply() {

  let title_list = [];
  let inbox_list = [];
  
  for (let i = 0; i < input_num; i++) {
    title_list.push(<p className="text" id={"iTitle" + String(i)}>{input_titles[i]}</p>)
    inbox_list.push(<input type="text" id={inputs[i]} placeholder={input_hints[i]}></input>);
  }

  // let supplementaries = db.user.find({clubname: {clubname}}, {supplementaries: 1});
  
  for (let i = 0; i < 3; i++)
  {
    // input_titles.push("Supplementary Question " + String(i+1) + "*");
    if (i >= supplementary_num)
    {
      // no question provided
      title_list.push(<a></a>);
      inbox_list.push(<a></a>);
    }
    else
    {
      title_list.push(<p className="text" id={"sTitle" + String(i)}>{supplementaries[i]}</p>)
      inbox_list.push(<input type="text" id={"supplementary" + String(i)} placeholder="Enter your answer"></input>);
    }
  }

  document.body.style.overflow = "visible";

  return (
  <>
    <div className="row">
      {title_list[0]}
      {inbox_list[0]}
    </div>
    <div className="row">
      {title_list[1]}
      {inbox_list[1]}
    </div>
    <div className="row">
      {title_list[2]}
      {inbox_list[2]}
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
      {title_list[3]}
      {inbox_list[3]}
    </div>

    <div className="row">
      {title_list[4]}
      {inbox_list[4]}
    </div>

    <div className="row">
      {title_list[5]}
      {inbox_list[5]}
    </div>

    <div className="row">
      {title_list[6]}
      {inbox_list[6]}
    </div>
    
    <button id="submit application button" onClick={saveAnswer}>Submit</button>
    <p id="texto"></p>
  </>
  );
}

async function postAnswer(answer_list, supplementary_answer_list)
{
  try{  
    await axios.post("http://localhost:8000/apply",{
        answer_list, supplementary_answer_list
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

/*
async function getCreation(e){
  e.preventDefault();

  try{

      await axios.post("http://localhost:8000/club_search",{
          clubname
      })
      .then(res=>{
          if(res.data){
              alert("Club found")
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

  res

}
*/


export default Apply;
// export default {Apply, Create};