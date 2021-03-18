import React from 'react';
import './App.css';
import TxtVenture, { TxtVentureProps, TxtVentureRenderObject } from './TxtVenture/TxtVenture';
import { TxtActionId, TxtActionEvent } from './TxtVenture/TxtAction';
import { TxtSceneProps } from './TxtVenture/TxtScene';
import { TxtObjectProps } from './TxtVenture/TxtObject';


enum MyObjectId {
  "jailBars",
  "dirtyMug",
  "jailWindow",
  "rat",
  "getOutOfJailFreeCard",
  "needle",
  "pieceOfCheese",
}

enum MySceneId {
  "myScene1",
}

let myTxt = new TxtVentureProps<MyObjectId, MySceneId>();
myTxt.title = "My TxtVenture";
myTxt.setScene(MySceneId.myScene1);
myTxt.id = "MyTxtVenture";

myTxt.setActions([
  {
    id: TxtActionId.open,
    text: "Öffne",
    targetObjectCount: 1,
    preposition: "",
  }, {
    id: TxtActionId.close,
    text: "Schließe",
    targetObjectCount: 1,
    preposition: "",
  },
  {
    id: TxtActionId.push,
    text: "Drücke",
    targetObjectCount: 1,
    preposition: "",
  },
  {
    id: TxtActionId.pull,
    text: "Ziehe",
    targetObjectCount: 1,
    preposition: "",
  },
  {
    id: TxtActionId.walkTo,
    text: "Gehe zu",
    targetObjectCount: 1,
    preposition: "",
  },
  {
    id: TxtActionId.pickUp,
    text: "Nimm",
    targetObjectCount: 1,
    preposition: "",
  },
  {
    id: TxtActionId.talkTo,
    text: "Rede mit",
    targetObjectCount: 1,
    preposition: "",
  },
  {
    id: TxtActionId.give,
    text: "Gib",
    targetObjectCount: 2,
    preposition: "an",
  },
  {
    id: TxtActionId.use,
    text: "Benutze",
    targetObjectCount: 4,
    preposition: "mit",
  },
]);

myTxt.setStandardResponse([
  "Hä?",
  "Wie soll das denn gehen?",
  "Was?",
  "Wie bitte?",
  "Das wird so nichts!",
])

myTxt.setObjects([
  {
    id: MyObjectId.jailBars,
    text: () => { return "Gefängnisgitter"; },
    onPickUp: (event: TxtActionEvent<MyObjectId>) => {
      event.command.response = "Das ist viel zu schwer!";
      event.handled = true;
    },
    onTalkTo: (event: TxtActionEvent<MyObjectId>) => {
      event.command.response = "Red doch selber mit der Wand!";
      event.handled = true;
    },
  }, {
    id: MyObjectId.dirtyMug,
    text: () => { return "dreckiger Krug"; },
  }, {
    id: MyObjectId.jailWindow,
    text: () => { return "Fenster"; },
  }, {
    id: MyObjectId.rat,
    text: () => { return "Ratte"; },
    onGive: (event: TxtActionEvent<MyObjectId>) => {
      
    },
  }, {
    id: MyObjectId.getOutOfJailFreeCard,
    text: () => { return "Gefängnis frei Karte"; },
  }, {
    id: MyObjectId.needle,
    text: () => { return "Nadel"; },
  }, {
    id: MyObjectId.pieceOfCheese,
    text: () => { return "Stück Käse" },
  }
]);

myTxt.setInventory([
  MyObjectId.getOutOfJailFreeCard,
  MyObjectId.needle,
  MyObjectId.pieceOfCheese,
]);

// Example for a scene
class MyScene1 extends TxtSceneProps<MyObjectId, MySceneId> {
  // id of the scene
  id = MySceneId.myScene1;
  // title
  title = "My Scene 1";
  // used objects in the scene
  objectIds = [
    MyObjectId.jailBars,
    MyObjectId.dirtyMug,
    MyObjectId.rat,
    MyObjectId.jailWindow,
  ];

  // render method
  text = function (txt: TxtVentureRenderObject<MyObjectId>): React.ReactNode {
    return (<p>
      Du erwachst in einer Gefängniszelle.
      Deine Pritsche ist hart und ungemütlich.
        Ein {txt.renderObject(MyObjectId.jailBars)} versperrt dir den Ausgang.<br />
      Neben deiner Pritsche steht ein {txt.renderObject(MyObjectId.dirtyMug)}.
        Irgendwo in der Ecke hörst du eine {txt.renderObject(MyObjectId.rat)} rascheln.
        Durch das {txt.renderObject(MyObjectId.jailWindow)} kannst du ein kleinen Teil des Himmels sehen.
        <br />
      <br />
      Was möchtest du tun?
      </p>)
  };

}

myTxt.setScenes([
  new MyScene1(),
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <TxtVenture txt={myTxt} />
    </div>
  );
}

export default App;
