export interface TxtObject {}

export interface TxtPerson extends TxtObject {}

export interface TxtScene extends TxtObject {}

export interface TxtAction extends TxtObject {
  name: string;
  isEnabled: boolean;
}

export interface TxtActions extends TxtObject {
  giveTo: TxtAction;
  open: TxtAction;
  close: TxtAction;
  pickUp: TxtAction;
  lookAt: TxtAction;
  talkTo: TxtAction;
  push: TxtAction;
  pull: TxtAction;
  goto: TxtAction;
  use: TxtAction;
  save: TxtAction;
  load: TxtAction;
}

export class TxtVenture {
  title: string = "TextVenture";
  isEditor: boolean = true;
  actions: TxtActions = {
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
  objects: TxtObject[] = [];
  persons: TxtPerson[] = [];
  inventory: TxtObject[] = [];
  scenes: TxtScene[] = [];
  scene: TxtScene | null = null;
  logBook: string[] = [];

  static action(txt: TxtVenture, action: TxtAction) {
    txt.logBook.push(action.name);
  }
}

export default TxtVenture;
