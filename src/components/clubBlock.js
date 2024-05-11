import React from 'react';

const ClubBlock = ({ image, title, description }) => {
    return (
        <div className="club-block">
            <img src={image} id="club-image" />
            <div className="club-details">
                <h2 id="club-title">{title}</h2>
                <p id="club-description">{description}</p>
            </div>
        </div>
    );
};

export default ClubBlock;