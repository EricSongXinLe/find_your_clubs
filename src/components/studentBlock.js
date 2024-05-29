import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


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
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/clubs')
        .then((response) => {
            setClubs(response.data);
            console.log('Fetched clubs:', clubs);
            //setClubs(response.data);
        })
        .catch(error => {
            console.error('Error fetching clubs:', error);
        });
}
, []);
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

                {selected === 'search' && <SearchBar />}
                {
                    <div className="club-box">
                        <ClubBlock image={require('../images/logo.webp')} title={""} description="Description of Club 1" />
                        <ClubBlock image={require('../images/logo.webp')} title={""} description="Description of Club 2" />
                        <ClubBlock image={require('../images/logo.webp')} title={""} description="Description of Club 3" />
                    </div>
                }
            </div>
        </div>
    )
}
export default StudentBlock