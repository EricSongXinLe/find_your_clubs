import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import e from "cors"


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
                alert("Please follow the right format of founding time")
                return;
            }
        foundingTime = new Date(year, month, date)

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
       
        console.log("tags!", tagsList)

        
        submit_club()
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
        <div className="login">

            <h1>Create a Club</h1>

            <form action="POST">
                <h2>Club Name</h2> 
                <input type="clubname" onChange={(e) => { setClubname(e.target.value) }} placeholder="Eg: SouLA" />
               <br></br>
               <h2>Founding Time</h2>   
               <input type="foundingdate" onChange={(e) => { setTime(e.target.value) }} placeholder="YYYY-MM-DD" />
  {/* <label for="year">Year:</label>
  <input type="number" id="year" name="year" min="1900" max="2100" onChange={(e) => {setYear(e.target.value)}} required/>

  <label for="month">Month:</label>
  <input type="number" id="month" name="month" min="1" max="12" onChange={(e) => {setMonth(e.target.value)}} required/>
  
  <label for="date">Date:</label>
  <input type="number" id="date" name="date" min="1" max="31" onChange={(e) => {setDate(e.target.value)}} required/> */}
  <br></br>
          <h2> Club Description</h2> 
                <input type="description" onChange={(e) => { setClubdescription(e.target.value) }} placeholder="Please give a brief club description in less than 200 words" />
  <br></br>
          <h2> Application Requirement </h2> 
                <input type="requirement" onChange={(e) => { setRequirement(e.target.value) }} placeholder="Requirements for club entry" />

                
            </form>
            <h2>Please add area tags for your club (Ctrl/command click for multiple selection)</h2>
            <form id="tagForm">
            <select multiple size="6"> 
                <option value="Computer Science" onClick={(e) => {setCs(true),  console.log("Hello")}}>Computer Science</option> 
                <option value="Math" onClick={(e) => {setMath(true)}}>Math</option> 
                <option value="Physics" onClick={(e) => {setPhysics(true)}}>Physics</option> 
                <option value="Economics" onClick={(e) => {setEconomics(true)}}>Economics</option> 
                <option value="Data Science" onClick={(e) => {setDs(true)}}>Data Science</option> 
                <option value="Material Engineering" onClick={(e) => {setMe(true)}}>Material Engineering</option> 
            </select>
    </form>
    <input type="submit" onClick={data_process} />

        </div>
        
    )
}

export default AddClub