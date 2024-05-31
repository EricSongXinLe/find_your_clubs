import * as React from 'react';
import { useState } from 'react';

import '../styles.css';

import ModeSelector from './changeMode'; 
import ClubBlock from './clubBlock';
import SearchBar from './searchBar';
import FilterBar from './filterBar';
import PhotoDisplay from './photoDisplay';

function StudentBlock () {
    const tags = ['Publish Time', 'Experience Needed', 'Popular'];
    const imageLst = [
        './images/logo.webp',
        '../images/Econ-Panel.png',
        '../images/Econ-Panel.png'
      ];
      const [selected, setSelected] = useState('recommendation'); // Tracks which button is selected
    const [clubs, setClubs] = useState([
        {title: 'Club One', description: 'Description of Club One' },
        {title: 'Club Two', description: 'Description of Club Two' },
    ]);

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


    return (
        <div class ="web_page_container">
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

                {selected === 'search' && <SearchBar setSearchResults={updateClubs}/>}
                {
                    <div className="club-box">
                        {clubs.map((club) => (
                        <ClubBlock
                            image={require('../images/logo.webp')}
                            title={club.title}
                            id={club.title}
                        />
                    ))}
                    </div>
                }
            </div>
        </div>
    )
}
export default StudentBlock