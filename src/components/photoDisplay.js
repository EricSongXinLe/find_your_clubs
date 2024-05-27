import React, { useState, useEffect } from 'react';



const PhotoDisplay = (images) => {
    const [current, setCurrent] = useState(0);

    // Function to go to next image
    const nextImage = () => {
        setCurrent(current => (current + 1) % images.length);
    };

    // Function to go to previous image
    const prevImage = () => {
        setCurrent(current => (current + images.length - 1) % images.length);
    };

    // Effect for automatic transition
    useEffect(() => {
        const timer = setTimeout(() => {
            nextImage();
        }, 3000); // Change image every 3 seconds

        return () => clearTimeout(timer); // Clear timeout if component unmounts
    }, [current]);

    return (
        <div className="photo-display">
            <button className="left-button" onClick={prevImage}>&lt;</button>
            <img src={images[current]} alt={"SHABI"} />
            <button className="right-button" onClick={nextImage}>&gt;</button>
        </div>
    );
};

export default PhotoDisplay;