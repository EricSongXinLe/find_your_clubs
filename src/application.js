import { useState } from "react";
import axios from "axios"

const inputList = ["name", "email", "gender", "birthday"];
const input_num = inputList.length;
const inputHintList = [];
const inputTitleList = [];
for (let i = 0; i < input_num; i++) {
  inputHintList.push("Enter your " + inputList[i] + " here");
  inputTitleList.push("What is your " + inputList[i] + "?*");
}

const selectionTitleList = [];
selectionTitleList.push("What is your Year of Graduation?*");
const selection_num = selectionTitleList.length;


function saveData() {
  // var fs = require('fs');
  // fs.appendFile("testOutput.txt", "Hello World");
  // console.log(fs.readFile("testInput.txt"));


  let finished = true;

  for (let i = 0; i < input_num; i++) {
    let text_box = document.getElementById(inputList[i]);
    let question = document.getElementById("iTitle" + String(i));
    if (text_box.value == "") // if empty
    {
      question.innerHTML = inputTitleList[i] + " Required";
      question.style.color = '#FF5733';
      finished = false;
    }
    else if (question.innerHTML != inputTitleList[i]) // revert to normal
    {
      question.style.color = '#000000';
      question.innerHTML = inputTitleList[i];
    }
  }

  for (let i = 0; i < selection_num; i++) {
    let selection = document.getElementById("Select1");
    let select = document.getElementById("sTitle");
    if (selection.value == "select") // if no selection
    {
      select.style.color = '#FF5733';
      select.innerHTML = selectionTitleList[i] + " Required";
      finished = false;
    }
    else if (select.innerHTML != selectionTitleList[i]) // revert to normal
    {
      select.style.color = '#000000';
      select.innerHTML = selectionTitleList[i];
    }
  }

  if (!finished)
    return;

  let answer_list = [];

  for (let i = 0; i < input_num; i++) {
    let text_box = document.getElementById(inputList[i]);
    answer_list.push(text_box.value);
  }

  for (let i = 0; i < selection_num; i++) {
    let selection = document.getElementById("Select1");
    answer_list.push(selection.value);
  }

  postData(answer_list);

  document.getElementById('texto').innerHTML = "Happy Birthday".concat(
    " ", document.getElementById(inputList[0]).value);

}

async function postData(answer_list) {
  try {
    await axios.post("http://localhost:8000/application", {
      answer_list
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



function Application() {

  // let inputs = createInputs();
  // console.log(inputs[0])

  let block_list = [];
  let title_list = [];

  for (let i = 0; i < input_num; i++) {
    block_list.push(<input type="text" name="" id={inputList[i]} placeholder={inputHintList[i]}></input>);
    title_list.push(<div className="text" id={"iTitle" + String(i)}>{inputTitleList[i]}</div>)
  }
  // let a = <input type="text" name="" id="myform" placeholder="Enter your name here"></input>;
  // let sh = String(inputs[0]);




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

      <div className="text" id="sTitle">{selectionTitleList[0]}</div><p></p>
      <select name="drop1" id="Select1">
        <option value="select">select</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
      </select><p></p>

      <div className="row">
        {title_list[3]}
        {block_list[3]}
      </div>

      <button id="button" onClick={saveData}>Click Me</button>
      <p id="texto"></p>
    </>
  );
}

export default Application