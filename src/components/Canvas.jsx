import React from "react";
import { Stage, Layer } from "react-konva";

import { useElementSize } from "../lib/ElementSize";

export function Canvas(props) {
  const elementSize = useElementSize(props.containerElement);

  return (
    <div style={{ position: "relative" }}>
      <Stage height={elementSize.height} width={elementSize.width}>
        {props.layers.map(layer => (
          <Layer key={layer.id}>{layer.shapes}</Layer>
        ))}
      </Stage>

      {props.children}
    </div>
  );
}
