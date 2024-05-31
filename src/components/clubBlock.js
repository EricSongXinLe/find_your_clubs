import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClubBlock = ({ image, title, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/club/${id}`);
  };

  return (
    <div className="club-block" onClick={handleClick}>
      <img src={image} id="club-image" alt="Club" />
      <div className="club-details">
        <h2 id="club-title">{title}</h2>
      </div>
    </div>
  );
};

export default ClubBlock;
