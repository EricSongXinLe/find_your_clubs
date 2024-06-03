import React from 'react';
import { useState } from 'react';

// FilterBar component to display filter options
const FilterBar = ({ tags, setSelected}) => {
    let activatetags = []
    const [activeTags, setActiveTags] = useState([]); 
    const handleTagClick = (tag) => {
        
        console.log("Current tag", tag)
        if (activeTags.includes(tag)) {
            activatetags = activatetags.filter(t => t !== tag); // Remove tag from activeTags
            // setActivatetags(tmp)
        } else {

            // const tmp = activeTags.slice()
            // tmp.push(tag)
            // setActiveTags(tmp)
            activatetags = [...activeTags, tag]; // Add tag to activeTags
        }

        setActiveTags(activatetags);
        console.log(activatetags);
        // console.log(typeof(tag))
        // console.log(tag)
        
         if (activatetags.includes("No Experience Needed")){
            setSelected("experience")
        }
        else if (activatetags.includes("Latest")){
            console.log("hAH")
            setSelected("time")
        }
        else if(activatetags.length === 0) {
            console.log("NIHAO")
            setSelected("recommendation")
        }
        // console.log("KUKU")
        // setSelected("filter")
    };

    return (
        <div className="filter-bar">
            <h3 id = "filter-bar-title">Filter by tags:</h3>
            <div className="chosen-tags">
                {activeTags.map(tag => (
                    <div key={tag} className="chosen-tag">
                        {tag}
                        <button className='filter-desel-button' onClick={() => handleTagClick(tag)}>X</button>
                    </div>
                ))}
            </div>
            <div className="available-tags">
                
                {tags.map(tag => (
                    !activeTags.includes(tag) && (
                        <div key={tag} className="tag" onClick={() => handleTagClick(tag)}>
                            {tag}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
