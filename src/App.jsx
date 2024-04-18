import React from "react";
import Player from "./Player";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Player initialBgColor="#ADD8E6" flipped={true} />
      <Player initialBgColor="#90EE90" flipped={false} />
    </div>
  );
}

export default App;
