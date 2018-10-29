import * as React from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import * as uuid from "uuid";
import cloneDeep from "lodash/cloneDeep";

import { Actions } from "./components/Actions";
import { CursorCrosshair } from "./components/CursorCrosshair";
import { Flex } from "./components/Flex";
import { ShapeEditor } from "./components/ShapeEditor/ShapeEditor";
import { Sidebar } from "./components/Sidebar";
import { useElementSize } from "./lib/ElementSize";

export enum ShapeTypes {
  Text = "Text",
  Rectangle = "Rect"
}

interface NewShape {
  label: string;
  type: ShapeTypes;
  options: {
    [key: string]: any;
  };
}

type Shape = { id: string } & NewShape;

interface SavedState {
  shapes: {
    [key: string]: Shape;
  };
  shapesOrder: string[];
}

const shapesMap = {
  [ShapeTypes.Rectangle]: Rect,
  [ShapeTypes.Text]: Text
};

const availableShapes = {
  [ShapeTypes.Text]: {
    label: "Text",
    type: ShapeTypes.Text,
    options: {
      x: 0,
      y: 0,
      text: "Test",
      fill: "#000000"
    }
  },
  [ShapeTypes.Rectangle]: {
    label: "Rectangle",
    type: ShapeTypes.Rectangle,
    options: {
      x: 50,
      y: 50,
      height: 100,
      width: 200,
      fill: "red"
    }
  }
};

function App() {
  const sidebarWidth = 200;

  const [shapes, setShapes] = React.useState({});
  const [shapesOrder, setShapesOrder] = React.useState<string[]>([]);
  const [activeShapeId, setActiveShapeId] = React.useState<string | null>(null);
  const canvasContainerRef = React.useRef(null);
  const elementSize = useElementSize(canvasContainerRef.current);

  React.useEffect(() => {
    const savedState = localStorage.getItem("state");

    if (!savedState) {
      return;
    }

    const parsedSavedState: SavedState = JSON.parse(savedState);

    if (!parsedSavedState) {
      return;
    }

    setShapes(parsedSavedState.shapes);
    setShapesOrder(parsedSavedState.shapesOrder);
  }, []);

  function onNewShapeSelected(newShape: NewShape) {
    const shapeId = uuid.v4();

    setShapes({ ...shapes, [shapeId]: cloneDeep(newShape) });
    setShapesOrder([...shapesOrder, shapeId]);
  }

  function onShapeUpdated(shapeId: string, newOptions: any) {
    setShapes({
      ...shapes,
      [shapeId]: {
        ...shapes[shapeId],
        options: {
          ...shapes[shapeId].options,
          ...newOptions
        }
      }
    });
  }

  const shapesList = React.useMemo(() =>
    shapesOrder.map(shapeId => ({
      ...shapes[shapeId],
      id: shapeId
    }))
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
          <Sidebar>
            <Sidebar.Item
              onClick={() =>
                onNewShapeSelected(availableShapes[ShapeTypes.Text])
              }
            >
              {availableShapes[ShapeTypes.Text].label}
            </Sidebar.Item>

            <Sidebar.Item
              onClick={() =>
                onNewShapeSelected(availableShapes[ShapeTypes.Rectangle])
              }
            >
              {availableShapes[ShapeTypes.Rectangle].label}
            </Sidebar.Item>
          </Sidebar>
        </Flex>
        <Flex style={{ position: "relative" }} innerRef={canvasContainerRef}>
          <Stage height={elementSize.height} width={elementSize.width}>
            <Layer>
              {shapesList.map(shape => {
                const Component = shapesMap[shape.type];

                return (
                  <Component
                    key={shape.id}
                    {...shape.options}
                    draggable
                    onDragEnd={({ evt }: any) => {
                      onShapeUpdated(shape.id, {
                        x: evt.dragEndNode.attrs.x,
                        y: evt.dragEndNode.attrs.y
                      });
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
          <Actions
            onSave={() => {
              localStorage.setItem(
                "state",
                JSON.stringify({
                  shapes,
                  shapesOrder
                })
              );
            }}
          />
        </Flex>
        <Flex style={{ maxWidth: `${sidebarWidth}px` }}>
          <Sidebar>
            <Sidebar.Header>Layers</Sidebar.Header>

            {shapesList.map(
              shape =>
                shape.id === activeShapeId ? (
                  <Sidebar.Item key={shape.id}>
                    {shape.label}

                    <ShapeEditor
                      type={shape.type}
                      options={shape.options}
                      onChange={newOptions => {
                        onShapeUpdated(shape.id, newOptions);
                      }}
                    />
                  </Sidebar.Item>
                ) : (
                  <Sidebar.Item
                    key={shape.id}
                    onClick={() => setActiveShapeId(shape.id)}
                  >
                    {shape.label}
                  </Sidebar.Item>
                )
            )}
          </Sidebar>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
