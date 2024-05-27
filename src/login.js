import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import './login.css'

function Login() {
    const history=useNavigate();

    const [username, setUsername] = useState('')
    const [password,setPassword]=useState('')
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/login",{
                username,password
            })
            .then(res=>{
                if(res.data=="fail"){
                    alert("Wrong username or password")
                }
                else if(res.data=="success"){
                    const userIsClubLeader = res.data.userIsClubLeader;
                    history("/",{state:{username:username, userIsClubLeader:userIsClubLeader}}) //passes the username as the id in the next page
                    console.log("Logged in")
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
            <h1>Login</h1>
            <form action="POST">
                <input class="textInput" type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" />
                <input class="textInput" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <br/>
                <input class= "submitButton" type="submit" onClick={submit} />
            </form>
            <Link to="/signup">Back to Signup</Link>
        </div>
    )
}
// Citation for the check switch https://www.w3schools.com/howto/howto_css_switch.asp
export default Login