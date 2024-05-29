import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import e from "cors"

import './addclub.css'

function AddClub() {

    const [clubname, setClubname] = useState('')
    const [clubdescription, setClubdescription] = useState('')
    const [requirement, setRequirement] = useState('')
    const [tags, setTags] = useState('[]')

    
    const [time, setTime] = useState('')
    const [cs, setCs] = useState(false)
    const [math, setMath] = useState(false)
    const [physics, setPhysics] = useState(false)
    const [economics, setEconomics] = useState(false)
    const [ds, setDs] = useState(false)
    const [me, setMe] = useState(false)
    let year, month, date

    let foundingTime;
    let tagsList = []
    async function data_process(e){
        var timeArray = time.split('-')
        
        year = timeArray[0]
        month = timeArray[1]
        date = timeArray[2]
        if (isNaN(year) || isNaN(month) || isNaN(date))
            {
                alert("Please follow the right format of founding time!")
                return;
            }
        foundingTime = new Date(year, month, date)
        if (clubname == "" || clubdescription == "" || requirement == "")
            {
                alert("Please fill in all the required fields!")
                return;
            }
        if (cs == false && math == false && physics == false && economics == false && ds == false && me == false)
            {
                alert("Please select at least one tag!")
                return;
            }
        

        // const tagsBoolList = [cs, math, physics, economics, ds, me]
        // const options = ["cs" ,"math", "physics", "economics", "ds", "me"]

        // if (cs)
        //     tagsList.push("cs")
        // if (math)
        //     tagsList.push("math")
        // if (physics)
        //     tagsList.push("physics")
        // if (economics)
        //     tagsList.push("economics")
        // if (ds)
        //     tagsList.push("ds")
        // if (me)
        //     tagsList.push("me")

        console.log("Test")
       
        //console.log("tags!", tagsList)

        
        submit_club()
        window.location.href ='/'
    }

    async function submit_club(e){
        // e.preventDefault();
        // console.log(time)
        // try{
        try{
            
            await axios.post("http://localhost:8000/addclub",{
                clubname, foundingTime, tagsList, clubdescription, requirement, cs, math, physics, economics, ds, me
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("Club already exists")
                }
                else if(res.data=="added"){
                    alert("Club added")
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

    return (
        <div className="addClubBody">

            <h2>Create a Club</h2>

            <form action="POST">
                <h3>Club Name</h3> 
                <input className="inputBar" id="clubName" onChange={(e) => { setClubname(e.target.value) }} placeholder="Eg: SouLA" />
               <br></br>
               <h3>Founding Time</h3>   
               <input className="inputBar" id="foundTime"type="foundingdate" onChange={(e) => { setTime(e.target.value) }} placeholder="YYYY-MM-DD" />
  {/* <label for="year">Year:</label>
  <input type="number" id="year" name="year" min="1900" max="2100" onChange={(e) => {setYear(e.target.value)}} required/>

  <label for="month">Month:</label>
  <input type="number" id="month" name="month" min="1" max="12" onChange={(e) => {setMonth(e.target.value)}} required/>
  
  <label for="date">Date:</label>
  <input type="number" id="date" name="date" min="1" max="31" onChange={(e) => {setDate(e.target.value)}} required/> */}
  <br></br>
          <h3> Club Description</h3> 
                <input className="inputBar" id="description" onChange={(e) => { setClubdescription(e.target.value) }} placeholder="Please give a brief club description in less than 200 words" />
  <br></br>
          <h3> Application Requirement </h3> 
                <input className="inputBar" id="requirement" onChange={(e) => { setRequirement(e.target.value) }} placeholder="Requirements for club entry" />

                
            </form>
            <h3>Please add area tags for your club (Ctrl/command click for multiple selection)</h3>
            <form id="tagForm">
            <select multiple size="6"> 
                <option value="Computer Science" onClick={(e) => {setCs(!cs),  console.log("Hello")}}>Computer Science</option> 
                <option value="Math" onClick={(e) => {setMath(!math)}}>Math</option> 
                <option value="Physics" onClick={(e) => {setPhysics(!physics)}}>Physics</option> 
                <option value="Economics" onClick={(e) => {setEconomics(!economics)}}>Economics</option> 
                <option value="Data Science" onClick={(e) => {setDs(!ds)}}>Data Science</option> 
                <option value="Material Engineering" onClick={(e) => {setMe(!me)}}>Material Engineering</option> 
            </select>
    </form>
    <input type="submit" onClick={data_process} />

        </div>
        
    )
}
export default AddClub