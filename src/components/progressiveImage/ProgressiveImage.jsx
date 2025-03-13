import { useState, useEffect } from 'react';

const ProgressiveImage = ({ thumbnail, highRes, alt, ...rest }) => {
  const [imageSrc, setImageSrc] = useState(thumbnail);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highRes;
    img.onload = () => {
      setImageSrc(highRes);
      setIsLoaded(true);
    };
  }, [highRes]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-50 blur-md'
      }`}
      {...rest}
    />
  );
};

export default ProgressiveImage;
