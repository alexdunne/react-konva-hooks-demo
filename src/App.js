import React from "react";
import { Stage, Layer, Text } from "react-konva";

import { useWindowSize } from "./lib/WindowSize";
import { Sidebar } from "./components/Sidebar";

function App() {
  const windowSize = useWindowSize();
  const sidebarWidth = 200;

  return (
    <div>
      <Sidebar width={sidebarWidth} />
      <div style={{ paddingLeft: sidebarWidth }}>
        <Stage
          height={windowSize.height}
          width={windowSize.width - sidebarWidth}
        >
          <Layer>
            <Text text="Hello" />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
