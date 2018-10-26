import React from "react";
import { Stage, Layer } from "react-konva";

import { useWindowSize } from "../lib/WindowSize";

export function Canvas(props) {
  const windowSize = useWindowSize();

  return (
    <div style={{ paddingLeft: props.leftOffset }}>
      <Stage
        height={windowSize.height}
        width={windowSize.width - props.leftOffset}
      >
        {props.layers.map(layer => (
          <Layer key={layer.id}>{layer.shapes}</Layer>
        ))}
      </Stage>

      {props.children}
    </div>
  );
}
