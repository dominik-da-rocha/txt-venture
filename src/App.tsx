import React from 'react';
import './App.css';
import TxtVenture, { TxtVentureProps, TxtCommandEvent } from './TxtVenture/TxtVenture';

let txt = new TxtVentureProps();
txt.title = "My TxtVenture";
txt.scene = "MyScene1";
txt.id = "MyTxtVenture";

txt.setActions([
  {
    id: "lookAt",
    title: "Schau zu",
    maxObjectLength: 1,
    preposition: "",
  },
  {
    id: "take",
    title: "Nimm",
    maxObjectLength: 1,
    preposition: "",
  },
  {
    id: "giveTo",
    title: "Gib",
    maxObjectLength: 2,
    preposition: "an",
  },
  {
    id: "open",
    title: "Öffne",
    maxObjectLength: 1,
    preposition: "",
  },
  {
    id: "close",
    title: "Schließe",
    maxObjectLength: 1,
    preposition: "",
  },
  {
    id: "goto",
    title: "Gehe zu",
    maxObjectLength: 1,
    preposition: "",
  },
  {
    id: "use",
    title: "Benutze",
    maxObjectLength: 2,
    preposition: "mit",
  },
  {
    id: "talkTo",
    title: "Rede mit",
    maxObjectLength: 1,
    preposition: "",
  },
]);

txt.setObjects([
  {
    id: "jail-bars",
    text: () => { return "Gefängnisgitter"; },
    onCommand: (event: TxtCommandEvent) => {
      console.log("command on object jail-bar: " + JSON.stringify(event))
    },
  }, {
    id: "dirty-mug",
    text: () => { return "dreckiger Krug"; },
    onCommand: (event: TxtCommandEvent) => {
      console.log("command on dirty-mug: " + JSON.stringify(event))
    },
  }
]);

txt.setScenes([
  {
    id: "MyScene1",
    title: "My Scene 1",
    text: function () {
      return (<p>
        Du erwachst in einer Gefängniszelle.
        Deine Pritsche ist hart und ungemütlich.
        Ein {txt.getObject("jail-bars")} versperrt dir den Ausgang.<br />
        Neben deiner Pritsche steht ein {txt.getObject("dirty-mug")}.<br />
        <br />
        Was möchtest du tun?
      </p>)
    },
    onCommand: (event: TxtCommandEvent) => {
      console.log("command on MyScene1: " + JSON.stringify(event))
    },
  }
]);



const App: React.FC = () => {
  return (
    <div className="App">
      <TxtVenture txt={txt} />
    </div>
  );
}

export default App;
