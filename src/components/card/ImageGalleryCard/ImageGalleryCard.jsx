import React from 'react';
import './imageGalleryCard.css'; // Import the CSS file

const ImageGalleryCard = ({ src, alt }) => {
  return (
    <div className="image-card">
      <img className="image" src={src} alt={alt} />
    </div>
  );
};

export default ImageGalleryCard;
