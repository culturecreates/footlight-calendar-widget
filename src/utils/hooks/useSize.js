import { useState, useEffect } from 'react';

const useSize = (selector, minSize) => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const element = document.querySelector(selector);
      if (element) {
        setIsSmall(element.offsetWidth < minSize);
      }
    };

    checkSize(); // Check on mount
    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [selector, minSize]);

  return isSmall;
};

export default useSize;
