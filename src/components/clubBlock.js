import React from 'react';
import { useHistory } from 'react-router-dom';

const ClubBlock = ({ image, title, description, id }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/club/${id}`);
  };

    return (
        <div className="club-block" onClick={handleClick}>
            <img src={image} id="club-image" />
            <div className="club-details">
                <h2 id="club-title">{title}</h2>
                <p id="club-description">{description}</p>
            </div>
        </div>
    );
};

export default ClubBlock;