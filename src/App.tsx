import React from "react";
import Venture from "./view/Venture";

const App: React.FC = () => {
  return (
    <div className="App">
      <Venture id="venture" isEditor={true} />
    </div>
  );
};

export default App;
