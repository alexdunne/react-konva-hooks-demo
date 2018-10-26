import React, { useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import { Rect, Text } from "react-konva";
import uuid from "uuid";

import { ShapeSidebar } from "./components/ShapeSidebar";
import { Canvas } from "./components/Canvas";
import { Actions } from "./components/Actions";
import { LayerSidebar } from "./components/LayerSidebar";
import { CursorCrosshair } from "./components/CursorCrosshair";

const shapesMap = {
  Text: Text,
  Rect: Rect
};

const availableShapes = [
  {
    id: "text",
    label: "Text",
    value: "Text",
    defaultOptions: {
      x: 0,
      y: 0,
      text: "Test"
    }
  },
  {
    id: "rectangle",
    label: "Rectangle",
    value: "Rect",
    defaultOptions: {
      x: 50,
      y: 50,
      height: 100,
      width: 200,
      fill: "red"
    }
  }
];

function App() {
  const [state, updateLayers] = useImmer({
    shapes: {},
    layers: {},
    layerIds: []
  });

  const sidebarWidth = 200;

  useEffect(() => {
    updateLayers(draft => {
      const layers = localStorage.getItem("layers");

      if (layers) {
        return JSON.parse(layers);
      }

      return draft;
    });
  }, []);

  function onShapeSelection(componentName, options) {
    updateLayers(draft => {
      const layerId = uuid.v4();
      const shapeId = uuid.v4();

      draft.shapes[shapeId] = { componentName, options };
      draft.layers[layerId] = { id: uuid.v4(), shapes: [shapeId] };
      draft.layerIds.push(layerId);
    });
  }

  function onShapeUpdated(shapeId, newOptions) {
    updateLayers(draft => {
      draft.shapes[shapeId].options = {
        ...draft.shapes[shapeId].options,
        ...newOptions
      };
    });
  }

  const layers = useMemo(() =>
    state.layerIds.map((layerId, index) => {
      const layer = state.layers[layerId];

      const shapes = layer.shapes.map(shapeId => {
        const shape = state.shapes[shapeId];
        const Component = shapesMap[shape.componentName];

        return (
          <Component
            key={shapeId}
            {...shape.options}
            draggable
            onDragEnd={({ evt }) => {
              onShapeUpdated(shapeId, {
                x: evt.dragEndNode.attrs.x,
                y: evt.dragEndNode.attrs.y
              });
            }}
          />
        );
      });

      return {
        id: layerId,
        name: state.shapes[layer.shapes[0]].componentName,
        shapes
      };
    })
  );

  return (
    <div>
      <CursorCrosshair colour="#333333" />

      <ShapeSidebar
        items={availableShapes}
        width={sidebarWidth}
        onSelection={onShapeSelection}
      />
      <Canvas layers={layers} leftOffset={sidebarWidth} />

      <LayerSidebar layers={layers} width={sidebarWidth} />

      <Actions
        onSave={() => {
          localStorage.setItem("layers", JSON.stringify(state));
        }}
      />
    </div>
  );
}

export default App;
