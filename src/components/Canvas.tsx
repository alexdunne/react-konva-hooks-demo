import * as React from "react";
import { Stage, Layer } from "react-konva";

import { useElementSize } from "../lib/ElementSize";

interface CanvasProps {
  containerElement: HTMLElement | null;
  children?: React.ReactNode;
  layers: CanvasLayer[];
}

export function Canvas(props: CanvasProps) {
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
