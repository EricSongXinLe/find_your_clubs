import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClubBlock = ({ image, title, description, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/club/${id}`);
    // fetch the id here
  };

  return (
    <div className="club-block" onClick={handleClick}>
      <img src={image} id="club-image" alt="Club" />
      <div className="club-details">
        <h2 id="club-title">{title}</h2>
        <p id="club-description">{description}</p>
      </div>
    </div>
  );
};

export default ClubBlock;
