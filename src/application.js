import {useState} from "react";
import axios from "axios"

const inputs = ["name", "email", "gender", "birthday"];
const input_num = inputs.length;
const input_hints = [];
const input_titles = [];
for (let i = 0; i < input_num; i++)
{
  input_hints.push("Enter your " + inputs[i] + " here");
  input_titles.push("What is your " + inputs[i] + "?*");
}

const selections = ["year of graduation"];
const selection_titles = [];
selection_titles.push("What is your Year of Graduation?*");
const selection_num = selections.length;


function saveAnswer() {
  // var fs = require('fs');
  // fs.appendFile("testOutput.txt", "Hello World");
  // console.log(fs.readFile("testInput.txt"));


  let finished = true;

  for (let i = 0; i < input_num; i++)
    {
      let text_box = document.getElementById(inputs[i]);
      let question = document.getElementById("iTitle" + String(i));
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

  for (let i = 0; i < selection_num; i++)
  {
    let selection = document.getElementById("Select1");
    let select = document.getElementById("sTitle");
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

  if (!finished)
    return;

  let answer_list = [];

  for (let i = 0; i < input_num; i++)
  {
    let text_box = document.getElementById(inputs[i]);
    answer_list.push(text_box.value);
  }

  for (let i = 0; i < selection_num; i++)
  {
    let selection = document.getElementById("Select1");
    answer_list.push(selection.value);
  }
  
  postAnswer(answer_list);

  document.getElementById('texto').innerHTML = "Happy Birthday".concat(
    " ", document.getElementById(inputs[0]).value);

}

function Apply() {
  
  // let inputs = createInputs();
  // console.log(inputs[0])

  let block_list = [];
  let title_list = [];
  
  for (let i = 0; i < input_num; i++) {
    block_list.push(<input type="text" name="" id={inputs[i]} placeholder={input_hints[i]}></input>);
    title_list.push(<p className="text" id={"iTitle" + String(i)}>{input_titles[i]}</p>)
  }
  // let a = <input type="text" name="" id="myform" placeholder="Enter your name here"></input>;
  // let sh = String(inputs[0]);

  // created_questions = db.user.find({clubname: {clubname}}, {created_questions: 1});
  


  return (
  <>
    <div className="row">
      {title_list[0]}
      {block_list[0]}
    </div>
    <div className="row">
      {title_list[1]}
      {block_list[1]}
    </div>
    <div className="row">
      {title_list[2]}
      {block_list[2]}
    </div>
    
    <div className="row">
      <p name="text" id="sTitle">{selection_titles[0]}</p><p></p>
      <select name="drop1" id="Select1">
        <option value="select">select</option>
        <option value="2024">2024</option>  
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
      </select><p></p>
    </div>

    <div className="row">
      {title_list[3]}
      {block_list[3]}
    </div>
    
    <button id="submit application button" onClick={saveAnswer}>Submit</button>
    <p id="texto"></p>
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