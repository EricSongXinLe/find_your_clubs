import { useState, useEffect } from "react";
import axios from "axios"
// useless comment

// input questions

function Apply() {
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
  // let supplementaries = ["A unique question*", "Another unique question*"];
  
  const [supplementaries, setData] = useState([]);
  
  //useEffect(() => {
    
  //});
  
  if (supplementaries.length == 0)
    getCreation("ABC");
  
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

  /*
  while (supplementaries.length == 0)
  {
    console.log("not yet")
    continue;
  }
  */
  
  console.log("omg", supplementaries)
  //console.log("supplementaries ", supplementaries);
  const supplementary_num = supplementaries.length;

  


  let general_show = []
  let supplementary_show = []
  
  for (let i = 0; i < input_num; i++) {
    let pair_show = [];
    pair_show.push(<p className="text" id={"iTitle" + String(i)}>{input_titles[i]}</p>);
    pair_show.push(<input type="text" id={inputs[i]} placeholder={input_hints[i]}></input>);
    general_show.push(pair_show);
  }

  // let supplementaries = db.user.find({clubname: {clubname}}, {supplementaries: 1});
  
  for (let i = 0; i < supplementaries.length; i++)
  {
    let pair_show = [];
    pair_show.push(<p className="text" id={"sTitle" + String(i)}>{supplementaries[i]}</p>);
    pair_show.push(<input type="text" id={"supplementary" + String(i)} placeholder="Enter your answer"></input>);
    supplementary_show.push(pair_show);
  }

  let yog_options = ["select", "2024", "2025", "2026", "2027"];

  document.body.style.overflow = "visible";

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

    <button id="submit application button" onClick={saveAnswer}>Submit</button>
    <p id="texto"></p>
  </>
  );
}

function saveAnswer() {
  return;
  /*
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
  */

}


async function postAnswer(answers, supplementary_answers)
{
  try{  
    await axios.post("http://localhost:8000/application",{
        answers, supplementary_answers
    })
      .then(res => {
        if (res.data == "exist") {
          alert("You've already submitted the application")
        }
        else if (res.data == "added") {
          alert("Application submitted successfully")
        }
      })
      .catch(e => {
        alert("An error occured")
        console.log(e);
      })
  }
  catch (e) {
    console.log(e);
  }
}






export default Apply;
// export default {Apply, Create};