import React from "react";
import { useMousePosition } from "../lib/MousePosition";

export function CursorCrosshair(props) {
  const { x, y } = useMousePosition();

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: x,
          height: "100%",
          width: "1px",
          backgroundColor: props.colour
        }}
      >
        {/* Vertical line */}
      </div>

      <div
        style={{
          position: "absolute",
          top: y,
          left: 0,
          width: "100%",
          height: "1px",
          backgroundColor: props.colour
        }}
      >
        {/* Horizontal line */}
      </div>

      <div
        style={{
          position: "absolute",
          top: y + 10,
          left: x + 10,
          backgroundColor: "#eeeeee",
          color: "#333333",
          borderRadius: "8px",
          padding: "4px 6px",
          fontSize: "14px"
        }}
      >
        {x - props.leftOffset}, {y}
      </div>
    </>
  );
}
