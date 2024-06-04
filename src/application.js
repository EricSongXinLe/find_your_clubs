import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import "./application.css"
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

// transferred username and clubName

function Apply() {
  const history = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const clubName = location.state?.clubname || "Error";

  // supplementary questions  
  const [supplementaries, setData] = useState([]);
  if (supplementaries.length == 0)
    getCreation(clubName);
  
  async function getCreation(clubName){

    try{
  
        await axios.get("http://localhost:8000/fetch_question",{
          params: {clubName:clubName}
        })
        .then(res=>{
            if(res.data){
              // alert("Club found")
              setData(res.data["supplementaryQuestion"])
              console.log("wtf", res.data["supplementaryQuestion"]);
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

    }
  }

  async function saveAnswer(supplementaries) {
  
    if (!(document.getElementById("iTitle0")))
      return;
  
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
        if (finished)
          alert(inputs[i] + " is required")
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
        select.innerHTML = selection_titles[i] + " Required";
        select.style.color='#FF5733';
        if (finished)
          alert(selections[i] + " is required")
        finished = false;
      }
      else if (select.innerHTML != selection_titles[i]) // revert to normal
      {
        select.style.color='#000000';
        select.innerHTML = selection_titles[i];
      }
    }
  
    // check for any unanswered required supplementary question
    for (let i = 0; i < supplementaries.length; i++)
    {
      let question = document.getElementById("sTitle" + String(i));
      let text_box = document.getElementById("supplementary" + String(i));
      if (text_box.value == "") // if empty
      {
        question.innerHTML = supplementaries[i] + "* Required";
        question.style.color = '#FF5733';
        if (finished)
          alert("Supplementary " + String(i) + " is required")
        finished = false;
      }
      else if (question.innerHTML != supplementaries[i]) // revert to normal
      {
        question.style.color = '#000000';
        question.innerHTML = supplementaries[i]+"*";
      }
    }
  
    // don't process if unfinished
    if (!finished)
      return;
  
    let answers = [];
  
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
    for (let i = 0; i < supplementaries.length; i++)
    {
      let text_box = document.getElementById("supplementary" + String(i));
      answers.push(text_box.value);
    }

    let saved_pairs = input_titles.concat(selection_titles);
    for (let i = 0; i < supplementaries.length; i++)
      saved_pairs.push(supplementaries[i]);
    for (let i = 0; i < saved_pairs.length; i++)
      saved_pairs[i] = saved_pairs[i] + ":" + answers[i];
    console.log(11111);
    postAnswer(clubName, username, saved_pairs); // send answers to backend database
    console.log(22222);
    // Happy Birthday
    if (document.getElementById(inputs[0]).value == "Paul Eggert")
      document.getElementById('texto').innerHTML = "Welcome! You must be THE Paul Eggert!";
    let condition = false;
    if (condition)
      document.getElementById('egg').style.display = "";
  
  }
  

  let general_show = []
  let supplementary_show = []
  
  for (let i = 0; i < input_num; i++) {
    let pair_show = [];
    pair_show.push(<p className="text" id={"iTitle" + String(i)}>{input_titles[i]}</p>);
    pair_show.push(<input type="text" id={inputs[i]} placeholder={input_hints[i]}></input>);
    general_show.push(pair_show);
  }
  
  let yog_options = ["select", "2024", "2025", "2026", "2027"];

  // supplementary questions' show tags
  for (let i = 0; i < supplementaries.length; i++)
  {
    let pair_show = [];
    pair_show.push(<p className="text" id={"sTitle" + String(i)}>{supplementaries[i] + "*"}</p>);
    pair_show.push(<input type="text" id={"supplementary" + String(i)} placeholder="Enter your answer"></input>);
    supplementary_show.push(pair_show);
  }

  document.body.style.overflow = "visible";
  if (document.getElementById("egg"))
    document.getElementById("egg").style.display = "none";

  return (
  <>
    <div className="row">
      {general_show.map((pair_show) => (
        <>
          {pair_show[0]}
          {pair_show[1]}
        </>
      ))}
    </div>
    
    <div className="row">
      <a name="text" id="sTitle">{selection_titles[0]}</a><a> </a>
      <select name="drop1" id="Select1">
        {yog_options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
    
    <div className="row">
      {supplementary_show.map((pair_show) => (
        <>
          {pair_show[0]}
          {pair_show[1]}
        </>
      ))}
    </div>

    <button id="submit application button" onClick={saveAnswer.bind(this, supplementaries)}>Submit</button>
    <p id="texto"></p>
    <p class="egg" id="egg"></p>
  </>
  );

async function postAnswer(clubName, username, saved_pairs)
{
  console.log(clubName)
  console.log(username)
  try{  
    await axios.post("http://localhost:8000/application",{
        clubName, username, saved_pairs
    })
      .then(res => {
        if (res.data == "exist") {
          alert(clubName + " " + username + " You've already submitted the application")
        }
        else if (res.data == "added") {
          alert("Application submitted successfully")
          history("/",{state:{username:username, userIsClubLeader:false}})
        }
      })
      .catch(e => {
        alert("An error occured")
        console.log(e);
      })
  }
  catch (e) {
    alert("e")
    console.log(e);
  }
}

}









export default Apply;
// export default {Apply, Create};