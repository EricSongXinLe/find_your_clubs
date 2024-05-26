import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Clubs() {
    const history=useNavigate();

    const [clubname, setClubname] = useState('')

    async function getclub(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/clubs",{
                clubname
            })
            .then(res=>{
                if(res.data){
                    alert("Club found")
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
        <form action="POST">
            <input type="clubname" onChange={(e) => {setClubname(e.target.value)}} placeholder="Clubname" className="input" />
            <input type="submit" onClick={getclub} />
        </form>
    )
}

export default Clubs