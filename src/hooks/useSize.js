import { useState, useEffect } from "react";
import { displayTypes } from "../constants/generalConstants";

export const useSize = () => {
  const [size, setSize] = useState(window.innerWidth);

  const handleResize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size < 600 ? displayTypes.MOBILE : displayTypes.DESKTOP;
};
