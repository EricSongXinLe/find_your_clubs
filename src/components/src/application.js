import {useState} from "react";

const questionList = ["name", "email", "gender", "birthday"];

function saveData() {
  let selection = document.getElementById("Select1").value;
  if (selection === "select") {
    document.getElementById("q4Text").style.color='#FF5733';
    document.getElementById("q4NA").style.color='#FF5733';
    document.getElementById("q4NA").innerHTML = "*Required";
  }

  const path = "log.txt";
  //const fs = require('fs');
  // let file = new File(path);
  let rnd = questionList.length;
  for (let i = 0; i < rnd; i++) {
    console.log(document.getElementById(questionList[i]).value);
    //file.writeln(document.getElementById(questionList[i]).value);
    //fs.writeFile(path, document.getElementById(questionList[i]).value);
  }
  document.getElementById('texto').innerHTML = "Happy Birthday".concat(
    " ", document.getElementById(questionList[0]).value);
}

function createInputs() {
  let inputs = [];
  for (let i = 0; i < questionList.legth; i++) {
    let a = <input type="text" name="" id={questionList[i]} placeholder="Enter your name here"></input>
    inputs.push(a);
  }
  return inputs;
}


export default function main() {
  
  /*
  document.querySelector('#myform').addEventListener('input', (Event)=>{
    console.log(Event.target.value);
  })
  */
  const inputs = createInputs();

  let a = <input type="text" name="" id="myform" placeholder="Enter your name here"></input>;

  return (
  <>
    
    <div className="row">
      <div className="text" id="q1Text">What is your name? </div>
      <input type="text" name="" id={questionList[0]} placeholder="Enter your name here"></input>
    </div>
    <div className="row">
      <div className="text" id="q2Text">What is your Email? </div>
      <input type="text" name="" id={questionList[1]} placeholder="Enter your Email here"></input>
    </div>
    <div className="row">
      <div className="text" id="q3Text">What is your Gender? </div>
      <input type="text" name="" id={questionList[2]} placeholder="Enter your gender here"></input>
    </div>
    
    <div className="text" id="q4Text">What is your Year of Graduation?</div><p id="q4NA"></p>
    <select name="drop1" id="Select1">
      <option value="select">select</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
    </select>
    
    <div className="row">
      <div className="text" id="q5Text">What is your Birthday? </div>
      <input type="text" name="" id={questionList[3]} placeholder="Enter your gender here"></input>
    </div>
    
    <button id="button" onClick={saveData}>click me</button>
    <button id="button">don't click me</button>
    <p id="texto"></p>


  </>
  );
}