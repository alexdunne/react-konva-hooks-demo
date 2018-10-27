import { useEffect, useState } from "react";

export const useElementSize = element => {
  const [size, setSize] = useState({
    width: element ? element.clientWidth : 0,
    height: element ? element.clientHeight : 0
  });

  const handleElementResize = e => {
    console.log(element);
    setSize({
      width: element.clientWidth,
      height: element.clientHeight
    });
  };

  useEffect(
    () => {
      if (element) {
        // New element so get the new size
        handleElementResize();
        element.addEventListener("resize", handleElementResize, false);
      }

      return function cleanUp() {
        if (element) {
          element.removeEventListener(handleElementResize);
        }
      };
    },
    [element]
  );

  return size;
};
