import * as React from 'react';
import { useState } from 'react';

import '../styles.css';

import ModeSelector from './changeMode';
import ClubBlock from './clubBlock';
import SearchBar from './searchBar';
import FilterBar from './filterBar';
import PhotoDisplay from './photoDisplay';

function StudentBlock() {
    const tags = ["Computer Science", "Math", "Physics", "Economics", "Data Science", "Material Engineering"];
    const imageLst = [
        './images/logo.webp',
        '../images/Econ-Panel.png',
        '../images/Econ-Panel.png'
    ];
    const [selected, setSelected] = useState('recommendation'); // Tracks which button is selected
    const [clubs, setClubs] = useState([
        { id: 1, image: 'image1.jpg', title: 'Club One', description: 'Description of Club One' },
        { id: 2, image: 'image2.jpg', title: 'Club Two', description: 'Description of Club Two' },
    ]);
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

                {selected === 'search' && <SearchBar />}
                {
                    <div className="club-box">
                        <ClubBlock image={require('../images/logo.webp')} title="Club 1" description="Description of Club 1" />
                        <ClubBlock image={require('../images/logo.webp')} title="Club 2" description="Description of Club 2" />
                        <ClubBlock image={require('../images/logo.webp')} title="Club 3" description="Description of Club 3" />
                    </div>
                }
            </div>
        </div>
    )
}
export default StudentBlock