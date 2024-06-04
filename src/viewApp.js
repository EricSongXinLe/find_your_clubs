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
   var clubsCreated = []
    console.log("12345")
    const history = useNavigate();
    const location = useLocation();
    const username = location.state?.username
    console.log(username)
    
    const fetchStudent = (data) => {
        return {
            favClubArr: data.favClubs
        };
      };

    async function fetchCreateClub(){
  try {

    // console.log(search)
    await axios.get('http://localhost:8000/favclub', { params: { username: username } })
    .then(
        res=>{
          const studentData = fetchStudent(res.data);
          clubsCreated = studentData.favClubArr
          console.log("123",clubsCreated)
        }
    ).catch((e)=>
        console.log(e)
    ) 
  }
    catch (error) {
    console.error('CANNOT find Fav Clubs', error);
  }
}
    fetchCreateClub();
    console.log(clubsCreated);

    
    document.body.style.overflow = "visible";

    // dictionary of dictionaries, one dictionry for one applicant
    // each dictionary contains general questions and possible supplementary questions
    let general = {"Alex": {"Birthday": "1227"}, "Bob": {"Birthday": "0511"}};
    let supplementary = {"Alex": {"Hobby": "laugh"}, "Bob": {"Age": "99", "Marriage Status": "Yes"}};
    let applicant_list = [];
    for (var key in general)
        applicant_list.push(key);
    //if (applicants.length > 0)
        //applicant = applicants[0];
    const [applicant, setApplicant] = useState(applicant_list[0]);
    console.log(applicant);
    
    // change each applicant's data into list of "tuples"
    for (var key in general)
    {
        let general_dict = general[key];
        let supp_dict = supplementary[key];
        let general_arr = [];
        let supp_arr = []
        
        // general questions
        for (var question in general_dict)
        {
            if (general_dict.hasOwnProperty(question))
            {
                general_arr.push([question, general_dict[question]]);
            }
        }

        // supplementary questions
        for (var question in supp_dict)
        {
            if (supp_dict.hasOwnProperty(question))
            {
                supp_arr.push([question, supp_dict[question]]);
            }
        }

        general[key] = general_arr;
        supplementary[key] = supp_arr;
    }

    /*
    // change question-answer pairs to tags for each applicant
    let general_show = {};
    let supplementary_show = {};
    for (var key in general)
    {

        let general_arr = structuredClone(general[key]);
        let supp_arr = structuredClone(supplementary[key]);

        // general questions
        for (let i = 0; i < general_arr.length; i++)
        {
            general_arr[i][0] = <h1>{general_arr[i][0]}</h1>;
            general_arr[i][1] = <h2>{general_arr[i][1]}</h2>;
        }

        // supplementary questions
        for (let i = 0; i < 3; i++)
        {
            if (i < supp_arr.length)
            {
                supp_arr[i][0] = <h1>{supp_arr[i][0]}</h1>;
                supp_arr[i][1] = <h2>{supp_arr[i][1]}</h2>;
            }
        }

        general_show[key] = general_arr;
        supplementary_show[key] = supp_arr;
    }
    */

    function refresh()
    {
        if (document.getElementById("applicant_selection"))
            setApplicant(document.getElementById("applicant_selection").value);
    }
    
    

    return (
        <>
            <select id="applicant_selection" onChange={refresh}>
                {applicant_list.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select><p></p>
            
            {general[applicant].map((pair) => (
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
        </>
    );

    /*
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
    */
}



export default ViewApp;