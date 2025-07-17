import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // Step 1: Initialize state with window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Step 2: Define the handler that updates window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Step 3: Add event listener for resize event
    window.addEventListener('resize', handleResize);

    // Step 4: Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return windowWidth;
};

export default useWindowWidth;
