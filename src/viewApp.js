import React, { useEffect, useState } from "react";

function ViewApp() {
    const [applications, setApplications] = useState([]);

    const getApplications = () => {
        fetch('http://localhost:8000/application')
        .then(response => response.json())
        .then(data => setApplications(data))
    }

    useEffect(() => {
        getApplications();
    }, []);

    document.body.style.overflow = "visible";

    return (
        <div className="right_cont">
            {applications.map(application => (
                <div key={application.id}>
                    <h2>Name: {application.name}</h2>
                    <h2>Email: {application.email}</h2>
                    <h2>Year of Graduation: {application.yearOfGraduation}</h2>
                    <h2>Birthday: {application.birthday}</h2>
                    <h2>Question 1: {application.question1}</h2>
                    <h2>Answer 1: {application.answer1}</h2>
                    <h2>Question 2: {application.question2}</h2>
                    <h2>Answer 2: {application.answer2}</h2>
                    <h2>Question 3: {application.question3}</h2>
                    <h2>Answer 3: {application.answer3}</h2>
                </div>
            ))}
        </div>
    );
}

export default ViewApp;