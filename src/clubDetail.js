import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState({
    image: '',
    title: '',
    description: '',
  });

  // Simulating fetching data
  useEffect(() => {
    // This is where you will fetch the data from your backend.
    // For now, we'll just use some dummy data to simulate this.
    const fetchClubDetails = async () => {
      const dummyData = {
        image: 'path/to/image.jpg',
        title: 'Club Title',
        description: 'Club Description',
      };
      setClub(dummyData);
    };

    fetchClubDetails();
  }, [id]);

  return (
    <div className="club-details">
      <img src={club.image} alt="Club" />
      <h1>{club.title}</h1>
      <p>{club.description}</p>
    </div>
  );
};

export default ClubDetails;
