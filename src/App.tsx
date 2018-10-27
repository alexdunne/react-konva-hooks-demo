import * as React from "react";
import { Rect, Text } from "react-konva";
import { useImmer } from "use-immer";
import * as uuid from "uuid";

import { Actions } from "./components/Actions";
import { Canvas } from "./components/Canvas";
import { CursorCrosshair } from "./components/CursorCrosshair";
import { Flex } from "./components/Flex";
import { LayerSidebar } from "./components/LayerSidebar";
import { ShapeSidebar } from "./components/ShapeSidebar";

const shapesMap = {
  Rect,
  Text
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
  const sidebarWidth = 200;

  const [state, updateLayers] = useImmer({
    shapes: {},
    layers: {},
    layerIds: []
  });

  const canvasContainerRef = React.useRef(null);

  React.useEffect(() => {
    updateLayers((draft: any) => {
      const savedLayers = localStorage.getItem("layers");

      if (savedLayers) {
        return JSON.parse(savedLayers);
      }

      return draft;
    });
  }, []);

  function onShapeSelection(componentName: string, options: any) {
    updateLayers((draft: any) => {
      const layerId = uuid.v4();
      const shapeId = uuid.v4();

      draft.shapes[shapeId] = { componentName, options };
      draft.layers[layerId] = { id: uuid.v4(), shapes: [shapeId] };
      draft.layerIds.push(layerId);
    });
  }

  function onShapeUpdated(shapeId: string, newOptions: any) {
    updateLayers((draft: any) => {
      draft.shapes[shapeId].options = {
        ...draft.shapes[shapeId].options,
        ...newOptions
      };
    });
  }

  const layers = React.useMemo(() =>
    state.layerIds.map((layerId: string) => {
      const layer = state.layers[layerId];

      const shapes = layer.shapes.map((shapeId: string) => {
        const shape = state.shapes[shapeId];
        const Component = shapesMap[shape.componentName];

        return (
          <Component
            key={shapeId}
            {...shape.options}
            draggable
            onDragEnd={({ evt }: any) => {
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
      <CursorCrosshair
        colour="#333333"
        leftOffset={sidebarWidth}
        rightOffset={sidebarWidth}
      />

      <Flex direction="row">
        <Flex style={{ maxWidth: `${sidebarWidth}px` }}>
          <ShapeSidebar
            shapes={availableShapes}
            width={sidebarWidth}
            onSelection={onShapeSelection}
          />
        </Flex>
        <Flex innerRef={canvasContainerRef}>
          <Canvas
            containerElement={canvasContainerRef.current}
            layers={layers}
          />
          <Actions
            onSave={() => {
              localStorage.setItem("layers", JSON.stringify(state));
            }}
          />
        </Flex>
        <Flex style={{ maxWidth: `${sidebarWidth}px` }}>
          <LayerSidebar layers={layers} width={sidebarWidth} />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
