import React from 'react';
import { useState } from 'react';

// FilterBar component to display filter options
const FilterBar = ({ tags}) => {
    const [activeTags, setActiveTags] = useState([]); 
    const handleTagClick = (tag) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(t => t !== tag)); // Remove tag from activeTags
        } else {
            setActiveTags([...activeTags, tag]); // Add tag to activeTags
        }
    };

    return (
        <div className="filter-bar">
            <div className="chosen-tags">

                {activeTags.map(tag => (
                    <div key={tag} className="chosen-tag">
                        {tag}
                        <button onClick={() => handleTagClick(tag)}>X</button>
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
