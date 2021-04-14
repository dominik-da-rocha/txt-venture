import { loremIpsum } from "./Lorem";

export interface TxtObject {
  name: string;
}

export interface TxtScene extends TxtObject {
  content: string;
}

export interface TxtAction extends TxtObject {
  isEnabled: boolean;
}

export class TxtVenture {
  title: string = "TextVenture";
  isEditor: boolean = true;
  scene: string = "scene1";
  actions: any = {
    giveTo: { name: "Gib", isEnabled: true },
    open: { name: "Öffne", isEnabled: true },
    close: { name: "Schließe", isEnabled: true },
    pickUp: { name: "Nimm", isEnabled: true },
    lookAt: { name: "Schau", isEnabled: true },
    talkTo: { name: "Rede mit", isEnabled: true },
    push: { name: "Drücke", isEnabled: true },
    pull: { name: "Ziehe", isEnabled: true },
    goto: { name: "Gehe zu", isEnabled: true },
    use: { name: "Benutze", isEnabled: true },
    save: { name: "Speichern", isEnabled: true },
    load: { name: "Laden", isEnabled: true },
  };
  objects: any = {
    object1: { name: "Object 1" },
    object2: { name: "Object 2" },
    object3: { name: "Object 3" },
    object4: { name: "Object 4" },
    object5: { name: "Object 5" },
    object6: { name: "Object 6" },
    object7: { name: "Object 7" },
    object8: { name: "Object 8" },
    object9: { name: "Object 9" },
    object10: { name: "Object 10" },
    object11: { name: "Object 11" },
    object12: { name: "Object 12" },
    object13: { name: "Object 13" },
    object14: { name: "Object 14" },
    object15: { name: "Object 15" },
    object16: { name: "Object 16" },
  };
  persons: any = {
    person1: { name: "Person 1" },
    person2: { name: "Person 2" },
    person3: { name: "Person 3" },
  };
  inventory: string[] = ["object1", "object2", "object3"];
  scenes: any = { scene1: { name: "Scene 1", content: loremIpsum } };
  logBook: string[] = [];

  static action(txt: TxtVenture, action: TxtAction) {
    txt.logBook.push(action.name);
  }
}

export default TxtVenture;
