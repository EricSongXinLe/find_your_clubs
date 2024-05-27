import {useState} from "react";

const questionList = ["name", "email", "gender", "birthday"];
const questionTextList = [];
const questionListLength = questionList.length;
for (let i = 0; i < questionListLength; i++)
  questionTextList.push("Enter your " + questionList[i] + " here*");


function saveData() {
  // var fs = require('fs');
  // fs.appendFile("testOutput.txt", "Hello World");
  // console.log(fs.readFile("testInput.txt"));


  // if no selection
  let selection = document.getElementById("Select1").value;
  if (selection === "select") {
    let select_q4 = document.getElementById("q4Text");
    select_q4.style.color='#FF5733';
    select_q4.innerHTML = select_q4.innerHTML + " Required";
  }

  /*
  for (let i = 0; i < rnd; i++) {
    let text_box = document.getElementById(questionList[i]);
    console.log(text_box.id.substring(0, 9));
    if (text_box.id.substring(0, 9) == "Selection")
    {
      // selection empty case
      console.log("selection");

    }
    else if (text_box.id.substring(0, 4) in questionList)
    {
      console.log("text");
    }

    console.log(text_box.value);
    console.log(text_box.id);
    // write data into json file
  }
  */
  for (let i = 0; i < quesitonListLength; i++)
  {
    let text_box = document.getElementById(questionList[i]);
    if (text_box.value == "")
    {
      text_box.innerHTML = questionTextList[i] + " Required";
      text_box.style.color = '#FF5733'
    }
  }

  document.getElementById('texto').innerHTML = "Happy Birthday".concat(
    " ", document.getElementById(questionList[0]).value);
}

/*
function createInputs() {
  let inputs = [];
  for (let i = 0; i < questionList.legth; i++) {
    // let a = <input type="text" name="" id={questionList[i]} placeholder="Enter your name here"></input>
    inputs.push("Alala");
    console.log(inputs[0])
  }
  return inputs;
}
*/


function Application() {
  
  // let inputs = createInputs();
  // console.log(inputs[0])

  let block_list = [];
  let rnd = questionList.length;
  for (let i = 0; i < rnd; i++) {
    block_list.push(<input type="text" name="" id={questionList[i]} placeholder={questionTextList[i]}></input>);
  }
  // let a = <input type="text" name="" id="myform" placeholder="Enter your name here"></input>;
  // let sh = String(inputs[0]);


  

  return (
  <>
    <div className="row">
      <div className="text" id="q1Text">What is your name?*</div>
      {block_list[0]}
    </div>
    <div className="row">
      <div className="text" id="q2Text">What is your Email?*</div>
      {block_list[1]}
    </div>
    <div className="row">
      <div className="text" id="q3Text">What is your Gender?*</div>
      {block_list[2]}
    </div>
    
    <div className="text" id="q4Text">What is your Year of Graduation?*</div><p id="q4NA"></p>
    <select name="drop1" id="Select1">
      <option value="select">select</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
    </select><p></p>
    
    <div className="row">
      <div className="text" id="q5Text">What is your Birthday?*</div>
      {block_list[3]}
    </div>
    
    <button id="button" onClick={saveData}>Click Me</button>
    <button id="button">Don't Click Me</button>
    <p id="texto"></p>
  </>
  );
}

export default Application