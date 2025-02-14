import React from 'react';
import './videoIframe.css';

const VideoIframe = ({ url }) => {
  return (
    <div className="video-container">
      <iframe
        className="video-iframe"
        src={url} // No autoplay, video plays on click
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoIframe;
