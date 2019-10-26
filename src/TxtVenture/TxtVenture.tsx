import "./TxtVenture.css";
import React from "react";
import TxtScene, { TxtSceneProps } from "./TxtScene";
import TxtObject, { TxtObjectProps } from "./TxtObject";
import { Identifiable } from "./TxtTools";
import TxtAction, { TxtActionProps } from "./TxtAction";

export interface TxtCommand {
  id: string | number | undefined;
  actionId: string;
  objectIds: string[];
  response: string;
}

export interface TxtCommandEvent {
  command: TxtCommand;
  handled: boolean;
}

export interface TxtVentureState {
  command: TxtCommand;
  commandStack: TxtCommand[];
}

export class TxtVentureProps {
  id: string = "";
  title: string = "";
  commandStackLength: number = 10;
  component: TxtVenture | undefined;
  standardResponse: string = "Hä?";

  objects: Map<string, TxtObjectProps> = new Map();
  setObjects(objects: TxtObjectProps[]) {
    this.objects = TxtVentureProps.makeMap(objects);
  }
  getObject(id: string): React.ReactNode {
    let object = this.objects.get(id);
    if (object === undefined)
      return <span className="Error">[error: object not found {id}]</span>
    else
      return <TxtObject
        id={object.id}
        text={object.text}
        onClick={this.getObjectOnClick()} />;
  }

  getObjectOnClick(): ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined {
    if (this.component === undefined)
      return undefined;
    else
      return this.component.onObjectClick;
  }

  scenes: Map<string, TxtSceneProps> = new Map();
  scene: string = "";
  setScenes(scenes: TxtSceneProps[]) {
    this.scenes = TxtVentureProps.makeMap(scenes);
  }
  getScene(id: string): React.ReactNode {
    let scene = this.scenes.get(id);
    if (scene === undefined)
      return <p>e: scene not found:{id}</p>
    else
      return <TxtScene
        id={scene.id}
        title={scene.title}
        text={scene.text} />;
  }

  actions: TxtActionProps[] = [];
  setActions(actions: TxtActionProps[]) {
    this.actions = actions;
  }
  getAction(actionId: string) {
    let action = this.actions.find((action: TxtActionProps) => {
      return action.id === actionId;
    })
    return action;
  }


  private static makeMap<T extends Identifiable>(array: T[]): Map<string, T> {
    let map = new Map<string, T>();
    array.forEach(element => {
      map.set(element.id, element);
    });
    return map;
  }
}

interface Props {
  txt: TxtVentureProps;
}


export class TxtVenture extends React.Component<Props, TxtVentureState> {

  txt: TxtVentureProps;

  constructor(props: Props) {
    super(props);
    this.txt = props.txt;
    this.txt.component = this;
    this.state = {
      command: {
        id: 0,
        actionId: "",
        objectIds: [],
        response: "",
      },
      commandStack: [],
    };
    this.onActionClick = this.onActionClick.bind(this);
    this.onObjectClick = this.onObjectClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }

  render() {
    return (
      <div className="TxtVenture" onClick={this.onBackgroundClick}>
        <h1>{this.txt.title}</h1>
        {this.renderScene()}
        <div className="TxtInventory">
          <h2>TxtInventory</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 7</li>
          </ul>
        </div>
        {this.renderActions()}
        {this.renderConsole()}
      </div >
    );
  }
  renderConsole(): React.ReactNode {
    return (<div className="TxtConsole">
      {this.renderCommand("/> ", this.state.command)}
      {this.state.commandStack.slice(0).reverse().map((command: TxtCommand) => {
        return this.renderCommand("- ", command);
      })}
    </div>);
  }
  renderCommand(prompt: string, command: TxtCommand): React.ReactNode {
    return <div className="TxtCommand" key={"commandId_" + command.id}>
      <div>
        <pre className="TxtPrompt">{prompt}</pre>
        {this.renderCommandAction(command)}
        {this.renderCommandObjects(command)}
      </div>
      {this.renderCommandResponse(command)}
    </div>;
  }

  renderCommandResponse(command: TxtCommand): React.ReactNode {
    if (command.response !== "") {
      return (
        <div className="TxtCommandResponse">
          <pre className="TxtPrompt">    </pre>
          <span>{command.response}</span>
        </div>)
    }
    else {
      return undefined;
    }
  }

  renderCommandAction(command: TxtCommand): React.ReactNode {
    let action = this.txt.getAction(command.actionId);
    let actionTitle = action === undefined ? "" : action.title;
    return <span>{actionTitle} </span>;
  }

  renderCommandObjects(command: TxtCommand) {
    let objects = command.objectIds.map((objectId: string, index: number, array: string[]) => {
      let object = this.txt.objects.get(objectId);
      let prep = "";
      if (index === 0 && array.length > 1) {
        let action = this.txt.getAction(command.actionId);
        if (action !== undefined)
          prep = action.preposition;
      } else if (index > 1 && array.length > 2) {
        prep = " und ";
      }

      if (object !== undefined)
        return <span key={object.id}>{object.text()} {prep} </span>
      else
        return undefined;
    });
    return objects;
  }

  evalCommand(event: TxtCommandEvent) {
    setTimeout(() => {
      this.evalCommandOnScene(event);
      this.evalCommandOnObject(event);
      this.evalCommandOnAction(event);
      this.finalizeCommand(event);
    }, 10);
  }

  evalCommandOnObject(event: TxtCommandEvent) {
    if (!event.handled) {
      event.command.objectIds.some((objectId: string) => {
        let object = this.txt.objects.get(objectId);
        if (object !== undefined && object.onCommand !== undefined) {
          object.onCommand(event);
        }
        return event.handled;

      });
    }
  }

  evalCommandOnScene(event: TxtCommandEvent) {
    if (!event.handled) {
      let scene = this.txt.scenes.get(this.txt.scene);
      if (scene !== undefined && scene.onCommand !== undefined) {
        scene.onCommand(event);
      }
    }
  }

  evalCommandOnAction(event: TxtCommandEvent) {
    if (!event.handled) {
      let action = this.txt.getAction(event.command.actionId);
      if (action !== undefined && action.maxObjectLength === event.command.objectIds.length) {
        event.handled = true;
        if (event.command.response === "")
          event.command.response = this.txt.standardResponse;
      }
    }
  }

  finalizeCommand(event: TxtCommandEvent) {
    if (event.handled) {
      this.pushCommandToStack(event.command);
      this.clearCommand();
    }
  }

  pushCommandToStack(command: TxtCommand) {
    this.setState((state: TxtVentureState) => {
      let copy: TxtCommand = {
        actionId: command.actionId,
        objectIds: command.objectIds.slice(),
        id: state.commandStack.length + 1,
        response: command.response,
      }
      state.commandStack.push(copy);
      if (state.commandStack.length > this.txt.commandStackLength) {
        state.commandStack.shift();
      }
      return state;
    });
  }


  renderActions(): React.ReactNode {
    return (<div className="TxtActions">
      {this.txt.actions.map((action: TxtActionProps) => {
        return <TxtAction
          key={action.id}
          id={action.id}
          maxObjectLength={action.maxObjectLength}
          title={action.title}
          preposition={action.preposition}
          onClick={this.onActionClick} />;
      })}
    </div>);
  }

  renderScene(): React.ReactNode {
    let scene = this.getScene();
    return (
      <TxtScene
        id={scene.id}
        title={scene.title}
        text={scene.text}>
      </TxtScene>
    );
  }

  getScene(): TxtSceneProps {
    let scene = this.txt.scenes.get(this.txt.scene);
    if (scene === undefined) {
      scene = {
        id: "NotFound",
        title: "Scene not found: " + this.txt.scene,
        text: function (): string { return ""; }
      }
    }
    return scene;
  }

  onActionClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setActionId(event.currentTarget.id);
    event.stopPropagation();
  }
  setActionId(actionId: string) {
    this.setState((state: TxtVentureState) => {
      let hasChanged = state.command.actionId !== actionId;
      if (hasChanged) {
        state.command.actionId = actionId;
        this.evalCommand({ command: state.command, handled: false });
      }
      return state;
    });
  }

  onObjectClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setObjectId(event.currentTarget.id);
    event.stopPropagation();
  }
  setObjectId(objectId: string) {
    this.setState((state: TxtVentureState) => {
      let hasChanged = !state.command.objectIds.some((element: string) => {
        return element === objectId;
      });
      if (hasChanged) {
        state.command.objectIds.push(objectId);
        this.evalCommand({ command: state.command, handled: false });
      }
      return state;
    });
  }
  onBackgroundClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.clearCommand();
  }
  clearCommand() {
    this.setState((state: TxtVentureState) => {
      let hasChanged =
        state.command.objectIds.length > 0
        || state.command.actionId !== "";

      if (hasChanged) {
        state.command.objectIds = [];
        state.command.actionId = "";
        state.command.response = "";
      }
      return state;
    });
  }





}

export default TxtVenture;
