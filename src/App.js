import React from "react";
import { useWindowSize } from "./lib/WindowSize";

function App() {
  const windowSize = useWindowSize();

  return (
    <div>
      <p>Height: {windowSize.height}</p>
      <p>Width: {windowSize.width}</p>
    </div>
  );
}

export default App;
