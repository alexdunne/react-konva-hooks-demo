import { useState, useEffect } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, false);

    return function cleanUp() {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}
