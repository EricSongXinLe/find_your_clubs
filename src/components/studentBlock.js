import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
// import { useDispatch } from "react-redux";


import ModeSelector from "./changeMode";
import ClubBlock from "./clubBlock";
import SearchBar from "./searchBar";
import FilterBar from "./filterBar";
import PhotoDisplay from "./photoDisplay";

var x = 0;
function StudentBlock(username) {
    const tags = ["Latest", "No Experience Needed", "Popular"];
    
    const [imageLst, setImageLst] = useState([]);
    const [selected, setSelected] = useState("recommendation"); // Tracks which button is selected

   
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://findyourclubs.ericsong.cn:8000/random-images');
                setImageLst(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const [clubs, setClubs] = useState([]);
    // console.log(clubs);
    // const dispatch = useDispatch();
    
    
    
    // useEffect(() => {
    //     dispatch(RenderClub());
    // }, [dispatch, selected]);

    // rest of component


    

    // RenderClub()

    const transformClubData = (data) => {
        return {
            title: data.clubname,
            description: data.clubdescription,
            image: `data:image/jpeg;base64,${Buffer.from(data.clubimg).toString('base64')}`,
        };
    };

    const updateClubs = (newClubInfo) => {
        const transformedData = transformClubData(newClubInfo);
        setClubs([transformedData]);
    };

    useEffect( () => {
        async function RenderClub(e) {
            // if(flag != 0) return
            // flag ++
            const stuname = username.username

            
            try {
                // console.log("New", stuname)
                // await axios.get('https://findyourclubs.ericsong.cn:8000/search', { params: { clubname: search } })
                await axios
                    .post("https://findyourclubs.ericsong.cn:8000/recommendClub", {
                        stuname, selected
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
                                    image: `data:image/jpeg;base64,${Buffer.from(club.clubimg).toString('base64')}`,
                                };
                                newClubs.push(element);
                            }

                            newClubs.sort(() => Math.random() - 0.5);
                            newClubs = newClubs.slice(0, 3);
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
        RenderClub()
    }, [selected]);
    
    return (
        <div class="web_page_container">
            <div class="left_cont">
                <div class="FilterBar">
                    <FilterBar tags={tags} setSelected={setSelected} 
                    // {/* // activeTags={activeTags} setActiveTags={setActiveTags} */}
                    />
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
                                image={club.image}
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
