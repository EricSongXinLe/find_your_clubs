import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import './signup.css'
import { md5 } from 'js-md5';
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
            if(password.length<8){
                alert("Password must be at least 8 characters long!")
                return
            }

            if(password.search(/[a-z]/i) < 0){
                alert("Password must contain at least one letter!")
                return
            }

            if(password.search(/[0-9]/) < 0){
                alert("Password must contain at least one digit!")
                return
            }

            if(password.search(/[!@#$%^&*.]/) < 0){
                alert("Password must contain at least one special character!")
                return
            }

            var hash = md5(password);
            await axios.post("https://findyourclubs.ericsong.cn:8000/signup",{
                username, email,password:hash,userIsClubLeader
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
                <input className="textInput" type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" />
                <input className="textInput" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input className="textInput" type="password" autoComplete="new-password webauthn" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <br/>
                <label>Are you a club leader?</label>
                <label className="switch">
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        setUserIsClubLeader(e.target.checked)}}/> 
                    <span className="slider round"></span>
                </label>
                <br/>
                <input className= "submitButton" type="submit" onClick={submit} />
            </form>
            <Link to="/login">Back to Login</Link>
        </div>
    )
}
// Citation for the check switch https://www.w3schools.com/howto/howto_css_switch.asp
export default Signup