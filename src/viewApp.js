import React, { useEffect, useState } from "react";
import axios from "axios"
import './viewApp.css'


async function viewApp() {
    document.body.style.overflow = "visible";
    const [applicant, setApplicant] = useState("Default");
    const [applicant_list, setApplicantList] = useState(["Default"])
    const [answer_dict, setAnswerDict] = useState({"Default":["Default Answer"]})

    const [answers, setAnswer] = useState([]);
    if (answers.length == 0)
        await getAnswer("xdf");

    async function getAnswer(clubName) {
        return new Promise((resolve, reject) => {
            try {
                console.log("getting")
                axios.get("http://localhost:8000/fetch_answer", {
                    params: { clubName: clubName }
                })
                    .then(res => {
                        if (res.data) {
                            alert("Club found")
                            setAnswer(res.data)
                            console.log("answers found", res.data);
                            return res.data;
                        }
                        else {
                            alert("Club not found")
                        }
                    })
                    .catch(e => {
                        alert("An error occurred")
                        console.log(e);
                    })
    
            }
            catch (e) {
    
            }
        });
        
    }

    // supplementary questions  
    const [supplementaries, setData] = useState([]);
    await getQuestion("xdf")

    async function getQuestion(clubName) {
        return new Promise((resolve, reject) => {
        try {

            axios.get("http://localhost:8000/fetch_question", {
                params: { clubName: clubName }
            })
                .then(res => {
                    if (res.data) {
                        // alert("Club found")
                        setData(res.data["supplementaryQuestion"])
                        console.log("supp questions", res.data["supplementaryQuestion"]);
                        return res.data;
                    }
                    else {
                        alert("Club not found")
                    }
                })
                .catch(e => {
                    alert("An error occurred")
                    console.log(e);
                })

        }
        catch (e) {

        }
        });
    }


    // build answer dictionary
    let temp_applicant_list = [];
    let temp_answer_dict = {};
    for (let i = 0; i < answers.length; i++) {
        // for each applicant
        temp_applicant_list.push(answers[i]["username"]);
        temp_answer_dict[answers[i]["username"]] = answers[i]["answers"];
    }
    console.log("upper", applicant_list,answer_dict, answers);
    setApplicantList(temp_applicant_list);
    setAnswerDict(temp_answer_dict);


    setApplicant(applicant_list[0]);

    // build question dictionary
    const general_questions = ["name", "email", "gender", "birthday", "yog"];
    const question_list = general_questions.concat(supplementaries);

    
    function refresh() {
        if (document.getElementById("applicant_selection"))
            setApplicant(document.getElementById("applicant_selection").value);
    }

    console.log("lower", applicant_list,answer_dict);
    return (
        <>
            <select id="applicant_selection" onChange={refresh}>
                {applicant_list.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select><p></p>

            {answer_dict[applicant].map((answer, index) => (
                <>
                    <div>
                        <h2 className="Title">Question: </h2>
                        <a className="Content">{question_list[index]}</a>
                    </div>
                    <div>
                        <h2 className="Title">Answer: </h2>
                        <a className="Content">{answer}</a>
                        <p></p>
                    </div>
                </>
            ))}
        </>
    );
}

function ViewApp()
{
    return viewApp();
}



export default ViewApp;



/*
{supplementary[applicant].map((pair) => (
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
*/