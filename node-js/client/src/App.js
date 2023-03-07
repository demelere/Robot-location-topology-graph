import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useCall } from "./services/api";
import { useScript, useWindowSize } from "usehooks-ts";
import { GraphRenderer } from "./components/Renderer";
// import { $, jQuery } from "jquery"; // to do: fix this so that $ and jQuery are always defined and loaded
const $ = require("jquery"); // temporary fix for loading jQuery and $ for arbor methods
const jQuery = require("jquery");

function App() {
  const robotStates = useCall();
  const [arbor, setArbor] = useState({});
  const [nodes, setNodes] = useState({});

  // loads jquery from cdn as a backup
  // to do: use import or require instead
  const jqueryLoadStatus = useScript(
    "https://code.jquery.com/jquery-3.6.0.min.js",
    { removeOnUnmount: false }
  );

  const arborLoadStatus = useScript(`${process.env.PUBLIC_URL}/arbor.js`, {
    removeOnUnmount: false,
  });

  // loads scripts
  useEffect(() => {
    if (typeof window.$ !== undefined && window.arbor !== undefined) {
      setArbor(window.arbor);
    }
  }, [jqueryLoadStatus, arborLoadStatus]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Robot Status</p>
        {jqueryLoadStatus &&
        arborLoadStatus &&
        Object.keys(arbor).length !== 0 &&
        typeof arbor !== undefined &&
        typeof window.$ !== undefined ? (
          <GraphRenderer arbor={arbor} robotStates={robotStates} />
        ) : null}
      </header>
    </div>
  );
}

export default App;
