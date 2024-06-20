import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import './login.css'
import { md5 } from 'js-md5';
function Login() {
    const history=useNavigate();

    const [username, setUsername] = useState('')
    const [password,setPassword]=useState('')
    async function submit(e){
        e.preventDefault();
        if(username==""){
            alert("Username is empty!")
            return
        } 
        if(password==""){
            alert("Password is empty!")
            return
        }
        var hash = md5(password);
        try{
            await axios.post("https://findyourclubs.ericsong.cn:8000/login",{
                username,password:hash
            })
            .then(res=>{
                if(res.data=="notmatch"){
                    alert("Wrong password")
                    return
                }
                else if(res.data=="notexist"){
                    alert("User does not exist")
                    return
                }
                else if(res.data=="successLeader"){
                    history("/",{state:{username:username, userIsClubLeader:true}}) //passes the username as the id in the next page
                }
                else if(res.data=="successStudent"){
                    history("/",{state:{username:username, userIsClubLeader:false}}) //passes the username as the id in the next page
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
                <input className="textInput" type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" />
                <input className="textInput" type="password" autoComplete="current-password webauthn" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <br/>
                <input className= "submitButton" type="submit" onClick={submit} />
            </form>
            <Link to="/signup">Back to Signup</Link>
        </div>
    )
}
// Citation for the check switch https://www.w3schools.com/howto/howto_css_switch.asp
export default Login