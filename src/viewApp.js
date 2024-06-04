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
    const [clubsCreated, setClubsCreated] = useState(["Default"]);
    const [clubAnswer, setClubAnswer] = useState([{"username": "Default", "answers":["Default"]}])
    var currAnswer = []
    const [club, setClub] = useState("Default");
    const [applicant, setApplicant] = useState("Default");
    const [applicant_list, setApplicantList] = useState(["Default"])
    const [pair_dict, setPairDict] = useState({"Default":["Default Question", "Default Answer"]})

    console.log("12345")
    const history = useNavigate();
    const location = useLocation();
    const username = location.state?.username
    console.log(username)

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
                        setClubsCreated(studentData.favClubArr);
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
                        setClubAnswer(res.data);
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
    useEffect(() => {
        const fetchData = async () => {
            await fetchCreateClub();
            console.log(333, clubsCreated); // This will now run after fetchCreateClub has completed
            for (let i = 0; i < clubsCreated.length; i++) {
                const currClub = clubsCreated[i];
                console.log(i, currClub);
                await fetchFormforaClub(currClub);
                console.log(clubAnswer.length);
                for (let j = 0; j < clubAnswer.length; j++) {
                    console.log("Here!")
                    currAnswer = clubAnswer[j].answers;
                    console.log("Hi", j, currAnswer);
                }
            }
            console.log(clubsCreated); // correct here

        };

        fetchData();

    }, [username]);


    let temp_applicant_list = [];
    let temp_pair_dict = {};
    for (let i = 0; i < clubAnswer.length; i++)
    {
        temp_applicant_list.push(clubAnswer[i]["username"]);
        let qa_pair = [];
        for (let j = 0; j < clubAnswer[i]["answers"].length; j++)
        {
            qa_pair.push(clubAnswer[i]["answers"][j].split(':'));
        }
        temp_pair_dict[clubAnswer[i]["username"]] = qa_pair;
    }

    useEffect(() => {
        if (temp_applicant_list.length == 0)
            return;
        setApplicantList(temp_applicant_list);
        setPairDict(temp_pair_dict);
        setApplicant(temp_applicant_list[0]);
    }, [clubAnswer, clubsCreated]);


    function refresh() {
        if (document.getElementById("club_selection"))
            setClub(document.getElementById("club_selection").value);
        if (document.getElementById("applicant_selection"))
            setClub(document.getElementById("applicant_selection").value);
    }


    return (
        <>
            <select id="club_selection" onChange={refresh}>
                {clubsCreated.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select><p></p>

            <select id="applicant_selection" onChange={refresh}>
                {applicant_list.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select><p></p>

            {pair_dict[applicant].map((pair) => (
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
            ))}
        </>
    );

}



export default ViewApp;