import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import './signup.css'

function Signup() {
    const history=useNavigate();

    const [username, setUsername] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [userIsClubLeader, setUserIsClubLeader] = useState(false)

    async function submit(e){
        e.preventDefault();

        try{
            if(username==""){
                alert("Username is empty!")
                return
            } 
            if(email==""){
                alert("Email is empty!")
                return
            }
            if(password==""){
                alert("Password is empty!")
                return
            }
            
            await axios.post("http://localhost:8000/signup",{
                username, email,password,userIsClubLeader
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    //  //passes the username as the id in the next page
                    if (userIsClubLeader){
                        history("/",{state:{username:username, userIsClubLeader:userIsClubLeader}})
                    }
                    else{
                        history("/studentpreference",{state:{username:username, userIsClubLeader:userIsClubLeader}})
                    }
                    
                    
                    console.log("User created")
                }
            })
            .catch(e=>{
                alert("An error occured")
                console.log(e);
            })

        }
        catch(e){
            alert("An error occured")
            console.log(e);
        }

    }


    return (
        <div className="login">
        <link rel="stylesheet" href="signup.css" />
            <h1>Create an Account</h1>
            <form action="POST">
                <input class="textInput" type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" />
                <input class="textInput" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input class="textInput" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <br/>
                <label>Are you a club leader?</label>
                <label class="switch">
                    <input class="checkbox" type="checkbox" onChange={(e) => {
                        setUserIsClubLeader(e.target.checked)}}/> 
                    <span class="slider round"></span>
                </label>
                <br/>
                <input class= "submitButton" type="submit" onClick={submit} />
            </form>
            <Link to="/login">Back to Login</Link>
        </div>
    )
}
// Citation for the check switch https://www.w3schools.com/howto/howto_css_switch.asp
export default Signup