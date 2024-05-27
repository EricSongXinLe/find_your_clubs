import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './clubDetail.css';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState({
    image: '',
    title: '',
    description: '',
    requirements: '',
    tag: '',
    application: '', //Add Google link in this case.
    activitytime: '',
  });

  // Simulating fetching data
  useEffect(() => {
    // This is where you will fetch the data from your backend.
    // For now, we'll just use some dummy data to simulate this.
    const fetchClubDetails = async () => {
      const dummyData = {
        image: 'path/to/image.jpg',
        title: 'Dummy Club Name',
        //FOR TEST PURPOSE
        description: `Welcome to the Innovative Engineers Club, a vibrant community of passionate students dedicated to exploring the vast world of Electrical Engineering. Our club is a haven for those who are fascinated by the principles of electronics, power systems, signal processing, and telecommunications. We believe in fostering a collaborative environment where creativity and innovation thrive.
        \n\nOur club meets every week to discuss the latest advancements in technology, brainstorm project ideas, and work on hands-on projects that bring theoretical concepts to life. Whether you're interested in designing circuit boards, developing smart grids, or exploring the potential of renewable energy sources, our club provides the resources and mentorship needed to turn your ideas into reality.
        \n\nOne of our most exciting initiatives is the annual Robotics Challenge, where members design, build, and program robots to compete in various tasks. This competition not only hones our technical skills but also encourages teamwork and strategic thinking. Additionally, we host workshops on essential skills such as soldering, PCB design, and microcontroller programming, ensuring that all members, regardless of their prior experience, can actively participate and learn.

        \n\nOur guest speaker series is another highlight, featuring industry professionals and professors who share their insights on cutting-edge research and career opportunities in Electrical Engineering. These sessions offer invaluable networking opportunities and inspire members to pursue their academic and professional goals with greater clarity and determination.
        
        \n\nWe also place a strong emphasis on community outreach and education. Our club partners with local schools to conduct STEM workshops, aiming to ignite a passion for engineering in the younger generation. By demonstrating fun and practical applications of Electrical Engineering, we hope to inspire future engineers to pursue their dreams.
        
        \n\nThe Innovative Engineers Club is not just about technical development; we also focus on personal growth and camaraderie. Regular social events, such as movie nights, hiking trips, and game nights, help members build lasting friendships and create a supportive network that extends beyond the classroom.
        
        \n\nJoin us and be part of a dynamic group where your curiosity and ambition are celebrated. Whether you're a seasoned enthusiast or a curious beginner, the Innovative Engineers Club welcomes you to embark on an electrifying journey of discovery and innovation.`,
        requirements: 'Finish Math 31A&B',
        tag: '#computing',
        application: 'https://www.google.com',
        activitytime: '7-8pm, MWF',
      };
      setClub(dummyData);
    };

    fetchClubDetails();
  }, [id]);

  const handleButtonClick = () => {
    navigate('/application'); // Change this path to match the route in your application
  };

  return (
    <div className="club-details-container">
      <div className="club-header">
        <h1 className="club-title">{club.title}</h1>
        <p className="club-requirements"><strong>Requirements:</strong> {club.requirements}</p>
        <p className="club-tag"><strong>Tag:</strong> {club.tag}</p>
      </div>
      <div className="club-image-container">
        <img src={club.image} alt="Club" className="club-image" />
      </div>
      <div className="club-description-container">
        <pre className="club-description">{club.description}</pre>
      </div>
      <div className="club-footer">
        <p className="club-application">
          <strong>Application:</strong> <a href={club.application} target="_blank" rel="noopener noreferrer">Apply Here</a>
        </p>
        <p className="club-activitytime"><strong>Activity Time:</strong> {club.activitytime}</p>
      </div>
      <button className="navigate-button" onClick={handleButtonClick}>Go to Application Page</button>
    </div>
  );
};

export default ClubDetails;
