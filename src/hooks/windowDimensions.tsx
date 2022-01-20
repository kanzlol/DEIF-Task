import { useState, useEffect } from 'react';

// Gets window dimensions
function getWindowDimensions() {

  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height
  };

}

export default function useWindowDimensions() {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    
    // Sets new window dimensions when resized
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return windowDimensions;

}