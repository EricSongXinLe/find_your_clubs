import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { set } from "mongoose";


function Clubs() {
    const history=useNavigate();

    const [clubname, setClubname] = useState('')
    const [clubimg, setClubimg] = useState('')

    async function getclub(e){
        e.preventDefault();

        try{

            await axios.post("https://findyourclubs.ericsong.cn:8000/club_search",{
                clubname
            })
            .then(res=>{
                if(res.data){
                    setClubname(res.data.clubname);
                    const base64 = Buffer.from(res.data.clubimg).toString('base64');
                    setClubimg(`data:image/jpeg;base64,${base64}`);
                }
                else{
                    alert("Club not found")
                }
            })
            .catch(e=>{
                alert("An error occurred")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <form action="POST">
                <input type="clubname" onChange={(e) => {setClubname(e.target.value)}} placeholder="Clubname" className="input" />
                <input type="submit" onClick={getclub} />
            </form>
            <div>
                <h1>{clubname}</h1>
                {/* <p>{Buffer(clubimg).toString()}</p> */}
                {clubimg && <img id="image" src={clubimg} alt="Club" />}
            </div>
        </div>
    )
}

export default Clubs