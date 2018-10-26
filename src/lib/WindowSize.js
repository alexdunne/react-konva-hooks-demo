import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleWindowResize = e => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);

    return function cleanUp() {
      window.removeEventListener(handleWindowResize);
    };
  }, []);

  return windowSize;
};
