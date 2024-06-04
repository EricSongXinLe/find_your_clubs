import React, { useEffect, useState } from "react";
import './viewApp.css'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"

function ViewApp() {
    /*
    const [applications, setApplications] = useState([]);

    const getApplications = () => {
        fetch('http://localhost:8000/application')
        .then(response => response.json())
        .then(data => setApplications(data))
    }

    useEffect(() => {
        getApplications();
    }, []);
    */
    const [cclubsCreated, setClubsCreated] = useState(["Default"]);
    var clubsCreated = [];
    //const [clubAnswer, setClubAnswer] = useState([{"username": "Default", "answers":["Default"]}])
    var clubAnswer = []
    var currClub = '';
    var currAnswer = []
    let temp_applicant_list = [];
    let temp_pair_dict = {};
    const [club, setClub] = useState("Default");
    const [applicant, setApplicant] = useState("Default");
    const [applicant_list, setApplicantList] = useState(["Default"])
    var aa_list = [];
    const [pair_dict, setPairDict] = useState({"Default":["Default Question", "Default Answer"]})
    const [yourenshenqing, setshenq] = useState(true);

    //console.log("12345")
    const history = useNavigate();
    const location = useLocation();
    const username = location.state?.username
    //console.log(username)

    const handleRedirect = () => {
        history("/", { state: { username: username, userIsClubLeader: true } })
    };

    const fetchStudent = (data) => {
        return {
            favClubArr: data.favClubs
        };
    };

    async function fetchCreateClub() {
        try {

            // console.log(search)
            await axios.get('http://localhost:8000/favclub', { params: { username: username } })
                .then(
                    res => {
                        const studentData = fetchStudent(res.data);
                        clubsCreated = studentData.favClubArr;
                        console.log("123", clubsCreated)
                    }
                ).catch((e) =>
                    console.log(e)
                )
        }
        catch (error) {
            console.error('CANNOT find Fav Clubs', error);
        }
    }

    async function fetchFormforaClub(clubname) {
        try {

            console.log("This is", clubname)
            await axios.get('http://localhost:8000/viewclubApp', { params: { clubName: clubname } })
                .then(
                    res => {
                        clubAnswer = res.data;
                        console.log("456", clubAnswer);
                    }
                ).catch((e) =>
                    console.log(e)
                )
        }
        catch (error) {
            console.error('CANNOT find Fav Clubs', error);
        }
    }

    const fetspecificClub = async () => {
        currClub!=' ' &&await fetchFormforaClub(currClub);
        console.log("你啊",currClub)
        temp_applicant_list = [];
        temp_pair_dict = {};
        console.log("789", clubAnswer);
                for (let j = 0; j < clubAnswer.length; j++)
                {
                    temp_applicant_list.push(clubAnswer[j]["username"]);
                    console.log("NOW list is:",temp_applicant_list)
                    
                    let qa_pair = [];

                    for (let k = 0; k < clubAnswer[j]["answers"].length; k++)
                    {
                        qa_pair.push(clubAnswer[j]["answers"][k].split(':'));
                    }
                    temp_pair_dict[clubAnswer[j]["username"]] = qa_pair;
                    
                }
            }
    useEffect(() => {
        const fetchData = async () => {
            await fetchCreateClub();
            console.log(333, clubsCreated); 
            setClubsCreated(clubsCreated)// This will now run after fetchCreateClub has completed
            /*
            for (let i = 0; i < clubsCreated.length; i++) {
                const currClub = clubsCreated[i];
                console.log(i, currClub);
                await fetchFormforaClub(currClub);
                //console.log(clubAnswer.length);
                
                //console.log("NOTICE",clubAnswer)
                for (let j = 0; j < clubAnswer.length; j++)
                {
                    temp_applicant_list.push(clubAnswer[j]["username"]);
                    console.log("NOW list is:",temp_applicant_list)
                    let qa_pair = [];

                    for (let k = 0; k < clubAnswer[j]["answers"].length; k++)
                    {
                        qa_pair.push(clubAnswer[j]["answers"][k].split(':'));
                    }
                    temp_pair_dict[clubAnswer[j]["username"]] = qa_pair;
                }
                
                for (let j = 0; j < clubAnswer.length; j++) {
                    console.log("Here!")
                    currAnswer = clubAnswer[j].answers;
                    console.log("Hi", j, currAnswer);
                }
                
            }
            //console.log(clubsCreated); // correct here
            */
        };
        
         

        fetchData();


    }, [username]);


    async function applicAndQ () {
        console.log("start to set applicant & Questions")
        if (temp_applicant_list.length == 0){
            console.log("NoApplicant");
            setshenq(false);
            setApplicantList(["Default"]);
            return;
        }
        setshenq(true);
        console.log("Now set",temp_applicant_list)
        setApplicantList(temp_applicant_list);
        aa_list = temp_applicant_list;
        setPairDict(temp_pair_dict);
        setApplicant(temp_applicant_list[0]);
    }
    

    async function refresh1() {
        if (document.getElementById("club_selection")){
            setClub(document.getElementById("club_selection").value);
            currClub = document.getElementById("club_selection").value;
            console.log(currClub)
            await fetspecificClub();
            await applicAndQ();
        }
    
    }

    async function refresh2() {
        if (document.getElementById("applicant_selection")){
            await setClub(document.getElementById("applicant_selection").value);
            console.log(document.getElementById("applicant_selection").value);
            setApplicant(document.getElementById("applicant_selection").value);

        }
    }

    return (
        <>
            <div className="close-button" onClick={handleRedirect}>X</div>
            <select id="club_selection" onChange={refresh1}>
                {cclubsCreated.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select><p></p>

            <select id="applicant_selection" onChange={refresh2}>
                {applicant_list.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select><p></p>

            {!yourenshenqing? <h1>No One Applied YET !!!</h1>
            :pair_dict[applicant].map((pair) => (
                <>
                    <div>
                        <h2 className="Title">Question: </h2>
                        <a className="Content">{pair[0]}</a>
                    </div>
                    <div>
                        <h2 className="Title">Answer: </h2>
                        <a className="Content">{pair[1]}</a>
                        <p></p>
                    </div>
                </>
            ))
        }
        </>
    );

}



export default ViewApp;