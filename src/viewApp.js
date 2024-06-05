import React, { useEffect, useState } from "react";
import "./viewApp.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ViewApp() {
    const [clubsCreated, setClubsCreated] = useState([]);
    const [applicant_list, setApplicantList] = useState([]);
    const [application_list, setApplicationList] = useState([]); // the list of all applicants for the club

    const [applicant, setApplicant] = useState(""); // the applicant selected

    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username;

    const handleRedirect = () => {
        navigate("/", { state: { username: username, userIsClubLeader: true } });
    };

    async function fetchCreateClub() {
        // fetch all the clubs created by the user
        const res = await axios.get("http://localhost:8000/favclub", {
            params: { username: username },
        });
        // console.log("fetchCreateClub", res.data.favClubs);
        setClubsCreated(res.data.favClubs);
        selectClub(res.data.favClubs[0]);
    }

    async function selectClub(clubname) {
        const the_selection = document.getElementById("club_selection");
        if (the_selection) {
            fetchClubForm(the_selection.value);
        }
        else if (clubname) {
            fetchClubForm(clubname);
        }
    }

    async function fetchClubForm(club) {
        // fetch all the forms for a specific club
        try {
            const res = await axios.get("http://localhost:8000/viewclubApp", {
                params: { clubName: club },
            });
            // console.log("fetchClubForm", res.data);
            const applicationList = res.data.map((app) =>
                app.answers.map((answer) => answer.split("\t"))
            );
            const applicantList = res.data.map((app) => app.username);

            setApplicationList(applicationList);
            setApplicantList(applicantList);
        } catch (error) {
            console.error("cannot find", clubname, error);
        }
    }

    async function selectStudent() {
        const the_selection = document.getElementById("applicant_selection");
        if (the_selection && the_selection.value !== "no applicant submitted") {
            setApplicant(the_selection.value);
        }
    }

    useEffect(() => {
        fetchCreateClub().then(() => {
        selectClub();});
    }, []);

    return (
        <div className="scrollable-content">
            <div className="viewApp">
                <div className="select">
                    <h2>Select Club</h2>
                    <div className="close-button" onClick={handleRedirect}>
                        X
                    </div>
                    <select id="club_selection" onChange={selectClub}>
                        {clubsCreated.length === 0 ? (
                            <option>{"no club submitted"}</option>
                        ) : (
                            clubsCreated.map((name) => (
                                <option key={name}>{name}</option>
                            ))
                        )}
                    </select>

                    <h2>Select Applicant:</h2>
                    <select id="applicant_selection" onChange={selectStudent}>
                        {applicant_list.length === 0 ? (
                            <option>{"no applicant submitted"}</option>
                        ) : (
                            applicant_list.map((name) => (
                                <option key={name}>{name}</option>
                            ))
                        )}
                    </select>
                    <p></p>
                </div>

                {applicant_list.length === 0 ? (
                    <h2>No application has been received yet. Please come back later.</h2>
                ) : (
                    applicant ? (
                        <div>
                            {application_list[applicant_list.indexOf(applicant)].map((pair, idx) => (
                                <div key={idx} className="applicationContainer">
                                    <div className="Q&A">
                                        <h2 className="Title">Question:</h2>
                                        <p className="Content">{pair[0]}</p>
                                    </div>
                                    <div className="QA">
                                        <h2 className="Title">Answer:</h2>
                                        <p className="Content">{pair[1]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <div>
                    {application_list[0].map((pair, idx) => (
                        <div key={idx} className="applicationContainer">
                            <div className="Q&A">
                                <h2 className="Title">Question:</h2>
                                <p className="Content">{pair[0]}</p>
                            </div>
                            <div className="QA">
                                <h2 className="Title">Answer:</h2>
                                <p className="Content">{pair[1]}</p>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default ViewApp;
