import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

import ModeSelector from "./changeMode";
import ClubBlock from "./clubBlock";
import SearchBar from "./searchBar";
import FilterBar from "./filterBar";
import PhotoDisplay from "./photoDisplay";

var x = 0;
function StudentBlock(username) {
    const tags = ["Publish Time", "Experience Needed", "Popular"];
    const [imageLst, setImageLst] = useState([]);
    const [selected, setSelected] = useState("recommendation"); // Tracks which button is selected


   
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/random-images');
                console.log('Fetched images:', response.data);
                setImageLst(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const [clubs, setClubs] = useState([]);
    console.log(clubs);

    React.useEffect(() => {
        RenderClub();
    }, []);

    x += 1;

    const transformClubData = (data) => {
        return {
            title: data.clubname,
            description: data.clubdescription,
        };
    };

    const updateClubs = (newClubInfo) => {
        const transformedData = transformClubData(newClubInfo);
        setClubs([transformedData]);
    };

    async function RenderClub(e) {
        try {
            // await axios.get('http://localhost:8000/search', { params: { clubname: search } })
            await axios
                .get("http://localhost:8000/recommendClub", {
                    params: { username: username.username },
                })
                .then((res) => {
                    if (res.data == "fail") {
                        alert("Error!");
                    } else {

                        var newClubs = []
                        for (const club of res.data) {
                            const element = {
                                title: club.clubname,
                                description: club.clubdescription,
                            };
                            newClubs.push(element);
                        }
                        setClubs(newClubs);

                        // history("/",{state:{username:username, userIsClubLeader:userIsClubLeader}})
                    }
                })
                .catch((e) => {
                    alert("An error occured");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
        // return("")
    }

    return (
        <div class="web_page_container">
            <div class="left_cont">
                <div class="FilterBar">
                    <FilterBar tags={tags} />
                </div>
            </div>

            <div class="mid_cont">
                <PhotoDisplay images={imageLst} />
            </div>

            <div class="right_cont">
                {<ModeSelector m_mode={selected} m_setMode={setSelected} />}

                {selected === "search" && <SearchBar setSearchResults={updateClubs} />}
                {
                    <div className="club-box">
                        {clubs.map((club) => (
                            <ClubBlock
                                image={require("../images/logo.webp")}
                                title={club.title}
                                id={club.title}
                            />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default StudentBlock;
