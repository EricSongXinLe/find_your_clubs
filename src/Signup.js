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

            await axios.post("http://localhost:8000/signup",{
                username, email,password,userIsClubLeader
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/",{state:{username:username, userIsClubLeader:userIsClubLeader}}) //passes the username as the id in the next page
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
                <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" className="input" />
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <br/>
                <label>Are you a club leader?</label>
                <label class="switch">
                    <input type="checkbox" onChange={(e) => {
                        setUserIsClubLeader(e.target.checked)}}/> 
                    <span class="slider round"></span>
                </label>
                <br/>
                <input type="submit" onClick={submit} />
            </form>
            <Link to="/">Back to Login</Link>
        </div>
    )
}
// Citation for the check switch https://www.w3schools.com/howto/howto_css_switch.asp
export default Signup