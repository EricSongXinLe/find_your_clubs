import React from 'react';
import { useState } from 'react';
import axios from 'axios';

// FilterBar component to display filter options
const FilterBar = ({ tags}) => {
    const [activeTags, setActiveTags] = useState([]); 
    const handleTagClick = (tag) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(t => t !== tag)); // Remove tag from activeTags
        } else {
            setActiveTags([...activeTags, tag]); // Add tag to activeTags
        }
        submit_tags(activeTags);
    };

async function submit_tags(activeTags) {
    try {
        await axios.post("http://localhost:8000", { activeTags });// Send activeTags to the server
        console.log("Data posted successfully");
    } catch (error) {
        console.error("Error posting data", error);
    }
    
}

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
