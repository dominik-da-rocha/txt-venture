import React from 'react';
import './App.css';
import Venture from './view/Venture';



const App: React.FC = () => {
  return (
    <div className="App">
      <Venture id="venture">
        Hello World
      </Venture>
    </div>
  );
}

export default App;
