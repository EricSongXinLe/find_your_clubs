import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function AddClub() {

    const [clubname, setClubname] = useState('')

    async function submit_club(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/addclub",{
                clubname
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

            <h1>Create an Club</h1>

            <form action="POST">
                <input type="clubname" onChange={(e) => { setClubname(e.target.value) }} placeholder="Clubname" />
                <input type="submit" onClick={submit_club} />
            </form>

        </div>
    )
}
export default AddClub