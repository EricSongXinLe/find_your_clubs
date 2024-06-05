import React, { useState, useEffect } from 'react';
import './photodisplay.css';

const PhotoDisplay = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const nextImage = () => {
        setCurrent(current => (current + 1) % images.length);
    };

    const prevImage = () => {
        setCurrent(current => (current + images.length - 1) % images.length);
    };

    useEffect(() => {
        if (images.length === 0) return;

        const timer = setTimeout(() => {
            nextImage();
        }, 3000); 

        return () => clearTimeout(timer); 
    }, [current, images]);

    if (images.length === 0) {
        return <p>Loading images...</p>;
    }

    return (
        <div>
        <div className="photo-display">
            <button className="left-button" onClick={prevImage}>&lt;</button>
            <img width="350px" height="350px" src={images[current]} alt="Club" />
            <button className="right-button" onClick={nextImage}>&gt;</button>
        </div>
        <p>Club Photo Gallery</p>
        </div>
    );
};

export default PhotoDisplay;
