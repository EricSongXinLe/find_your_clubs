import React, { useState } from "react";
import axios from "axios";

function AddClub() {
    const [clubname, setClubname] = useState("");
    const [clubdescription, setClubdescription] = useState("");
    const [requirement, setRequirement] = useState("");
    const [activityTime, setActivityTime] = useState("");
    const [optionalLink, setOptionalLink] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [tagsList, setTagsList] = useState([]);

    const [time, setTime] = useState("");

  
    const interests = ["ComSci", "Math", "Physics", "Data Science", "Economics", "Mechanical Engineering"];
    const input_num = interests.length;

    let year, month, date;
    let foundingTime;

    async function data_process(e) {
        e.preventDefault(); // Prevent default form submission behavior
        const timeArray = time.split("-");
        year = timeArray[0];
        month = timeArray[1];
        date = timeArray[2];
        if (isNaN(year) || isNaN(month) || isNaN(date)) {
            alert("Please follow the right format of founding time");
            return;
        }
        foundingTime = new Date(year, month, date);


        submit_club();
    }

    async function submit_club() {
        try {

            const formData = new FormData();
            formData.append("clubname", clubname);
            formData.append("foundingTime", foundingTime.toISOString());

            formData.append("tagsList", JSON.stringify(tagsList));

            formData.append("clubdescription", clubdescription);
            formData.append("requirement", requirement);
            formData.append("activityTime", activityTime);
            formData.append("optionalLink", optionalLink);

            if (selectedImage) {
                formData.append("clubimage", selectedImage);
            }

            const response = await axios.post("http://localhost:8000/addclub", formData,{
                
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data === "exist") {
                alert("Club already exists");
            } else if (response.data === "added") {
                alert("Club added");
            }
        } catch (error) {
            alert("An error occurred");
            console.log(error);

        }
    }
  
    let option_list = [];

    for (let i = 0; i < input_num; i++) {

        option_list.push( <option value={interests[i]} onClick={(e) => {
            const newArr = tagsList.slice()
        newArr.push(interests[i])
        setTagsList(newArr)
        }}> {interests[i]}</option> );
        
    }
    
    const getImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    return (
        <div style={{ overflowY: "scroll", maxHeight: "90%", margin: "50px"}}>
            <h1>Create a Club</h1>
            <form onSubmit={data_process}>
                <h2>Club Name</h2>
                <input
                    type="text"
                    onChange={(e) => setClubname(e.target.value)}
                    placeholder="Eg: SouLA"
                    required
                />
                <br />
                <h2>Club Image</h2>
                <input type="file" name="clubimage" onChange={getImage} />
                <br />
                <h2>Founding Time</h2>
                <input
                    type="text"
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    required
                />
                <br />
                <h2>Club Description</h2>
                <input
                    type="text"
                    onChange={(e) => setClubdescription(e.target.value)}
                    placeholder="Please give a brief club description in less than 200 words"
                    required
                />
                <br />
                <h2>Application Requirement</h2>
                <input
                    type="text"
                    onChange={(e) => setRequirement(e.target.value)}
                    placeholder="Requirements for club entry"
                    required
                />
                <br />
                <h2>Activity Time Period</h2>
                <input
                    type="text"
                    onChange={(e) => setActivityTime(e.target.value)}
                    placeholder="MWF 8-10 pm"
                    required
                />
                <br />
                <h2>Do you want to use an external link for application? i.e., Google Form link</h2>
                <input
                    type="text"
                    onChange={(e) => setOptionalLink(e.target.value)}
                    placeholder="www.apply.com"
                />
                <br />
                <h2>Please add area tags for your club (Ctrl/Command-click for multiple selection)</h2>
                <select multiple size="6">
                    {option_list[0]}
                    {option_list[1]}
                    {option_list[2]}
                    {option_list[3]}
                    {option_list[4]}
                    {option_list[5]}    
                    {/* <option
                        value="Computer Science"
                        onClick={() => setCs((prev) => !prev)}
                    >
                        Computer Science
                    </option>
                    <option value="Math" onClick={() => setMath((prev) => !prev)}>
                        Math
                    </option>
                    <option value="Physics" onClick={() => setPhysics((prev) => !prev)}>
                        Physics
                    </option>
                    <option
                        value="Economics"
                        onClick={() => setEconomics((prev) => !prev)}
                    >
                        Economics
                    </option>
                    <option value="Data Science" onClick={() => setDs((prev) => !prev)}>
                        Data Science
                    </option>
                    <option
                        value="Material Engineering"
                        onClick={() => setMe((prev) => !prev)}
                    >
                        Material Engineering
                    </option> */}
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddClub;
