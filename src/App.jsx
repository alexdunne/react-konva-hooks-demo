import React, { useState } from "react";
import uuid from "uuid";

import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";

function App() {
  const [layers, setLayers] = useState([]);

  const sidebarWidth = 200;

  function onShapeSelection(shape, options) {
    // Reassign as React requires components to have a captial variable name
    const Shape = shape;

    const newLayer = {
      id: uuid.v4(),
      shapes: [<Shape key={uuid.v4()} {...options} />]
    };

    setLayers([...layers, newLayer]);
  }

  return (
    <div>
      <Sidebar width={sidebarWidth} onSelection={onShapeSelection} />
      <Canvas layers={layers} leftOffset={sidebarWidth} />
    </div>
  );
}

export default App;
