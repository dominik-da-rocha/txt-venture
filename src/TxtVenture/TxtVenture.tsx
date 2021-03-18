import "./TxtVenture.css";
import React from "react";
import TxtScene, { TxtSceneProps } from "./TxtScene";
import TxtObject, { TxtObjectProps, TxtVentureObjectInterface, TxtObjectPool } from "./TxtObject";
import TxtAction, { TxtActionProps, TxtActionId, parseTxtActionId, TxtActionEvent, handleTxtActionEvent } from "./TxtAction";
import { TxtCommandProps, makeCopyOfTxtCommandProps, TxtVentureCommandInterface } from "./TxtCommand";
import TxtConsole, { TxtConsoleProps } from "./TxtConsole";
import { Identifiable } from "./TxtTools";
import TxtInventory, { TxtInventoryProps } from "./TxtInventory";

export class TxtVentureProps<TxtObjectId, TxtSceneId>
  implements TxtVentureCommandInterface<TxtObjectId>, TxtObjectPool<TxtObjectId> {

  id: string = "";
  title: string = "";

  console = {
    stackSize: 10,
    prompt: "->",
    responseIndent: 4,
  }

  private standardResponses: string[] = ["What?"];
  setStandardResponse(responses: string[]) {
    this.standardResponses = responses;
  }
  getStandardResponse(): string {
    let rand = Math.floor(Math.random() * this.standardResponses.length);
    return this.standardResponses[rand];
  };

  private andText: string = " und ";
  setAndText(and: string) {
    this.andText = " " + and.trim() + " ";
  }
  getAndText() { return this.andText; }

  private objects: Map<TxtObjectId, TxtObjectProps<TxtObjectId>> = new Map();
  setObjects(array: TxtObjectProps<TxtObjectId>[]) {
    this.objects = this.makeMapFromIdentifiableArray(array);
  }
  getObjectProps(id: TxtObjectId): TxtObjectProps<TxtObjectId> | undefined {
    return this.objects.get(id);
  }

  private scene!: TxtSceneId;
  setScene(scene: TxtSceneId) {
    this.scene = scene;
  }
  getScene() {
    return this.scene;
  }

  private scenes: Map<TxtSceneId, TxtSceneProps<TxtObjectId, TxtSceneId>> = new Map();
  setScenes(array: TxtSceneProps<TxtObjectId, TxtSceneId>[]) {
    this.scenes = this.makeMapFromIdentifiableArray(array);
    this.scenes.forEach((scene: TxtSceneProps<TxtObjectId, TxtSceneId>) => {
      scene.updateOwner(this);
    });
  }

  getSceneProps(id?: TxtSceneId): TxtSceneProps<TxtObjectId, TxtSceneId> | undefined {
    if (id === undefined)
      id = this.scene;

    let scene = this.scenes.get(id);
    if (scene === undefined)
      return undefined;
    else
      return scene;
  }
  renderScene(txt: TxtVentureRenderObject<TxtObjectId>, id?: TxtSceneId): React.ReactNode {
    if (id === undefined)
      id = this.scene;

    let scene = this.scenes.get(id);
    if (scene === undefined)
      return <p>e: scene not found:{id}</p>
    else
      return <TxtScene scene={scene} txt={txt} />;
  }

  private actions: TxtActionProps[] = [];
  setActions(actions: TxtActionProps[]) {
    this.actions = actions;
  }
  getActions() {
    return this.actions;
  }
  getActionProps(actionId: TxtActionId): TxtActionProps | undefined {
    let action = this.actions.find((action: TxtActionProps) => {
      return action.id === actionId;
    })
    return action;
  }

  private inventory: TxtInventoryProps<TxtObjectId> = new TxtInventoryProps();
  setInventory(inventory: TxtObjectId[]) {
    this.inventory.objectIds = inventory;
    this.inventory.updateOwner(this);
  }
  getInventory() {
    return this.inventory;
  }


  private makeMapFromIdentifiableArray<TId, TItem extends Identifiable<TId>>(array: TItem[]): Map<TId, TItem> {
    let map = new Map<TId, TItem>();
    array.forEach(element => { map.set(element.id, element); });
    return map;
  }
}

export interface TxtVentureRenderObject<TxtObjectId> {
  renderObject(objectId: TxtObjectId): React.ReactNode;
}


interface Props<TxtObjectId, TxtSceneId> {
  txt: TxtVentureProps<TxtObjectId, TxtSceneId>;
}

interface State<TxtObjectId> {
  command: TxtCommandProps<TxtObjectId>;
  console: TxtConsoleProps<TxtObjectId>;
  inventory: TxtInventoryProps<TxtObjectId>
}

function getCommandId(no: number) {
  return "command" + no;
}

export class TxtVenture<TxtObjectId, TxtSceneId>
  extends React.Component<Props<TxtObjectId, TxtSceneId>, State<TxtObjectId>>
  implements TxtVentureObjectInterface<TxtObjectId>, TxtVentureRenderObject<TxtObjectId> {

  constructor(props: Props<TxtObjectId, TxtSceneId>) {
    super(props);
    this.state = {
      command: {
        id: getCommandId(0),
        actionId: TxtActionId.none,
        objectIds: [],
        response: "",
      },
      console: {
        stack: [],
        commandCounter: 0,
        prompt: this.props.txt.console.prompt,
        responseIndent: this.props.txt.console.responseIndent,
      },
      inventory: this.props.txt.getInventory(),
    };
    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  render() {
    return <div className="TxtVenture" onClick={this.handleBackgroundClick}>
      <h1>{this.props.txt.title}</h1>
      {this.renderScene()}
      {this.renderInventory()}
      {this.renderActions()}
      {this.renderConsole()}
    </div >
  }

  renderActions(): React.ReactNode {
    return (<div className="TxtActions">
      {this.props.txt.getActions().map((action: TxtActionProps) => {
        action.onClick = this.handleActionClick;
        return <TxtAction key={action.id} action={action} />;
      })}
    </div>);
  }

  renderScene(): React.ReactNode {
    return this.props.txt.renderScene(this);
  }

  renderObject(id: TxtObjectId): React.ReactNode {

    let object = this.props.txt.getObjectProps(id);
    if (object === undefined)
      return <span className="Error">[error: object not found {id}]</span>
    else {
      return <TxtObject object={object} txt={this} />
    }
  }

  renderInventory(): React.ReactNode {
    return <TxtInventory
      inventory={this.state.inventory}
      txt={this} />
  }

  renderConsole(): React.ReactNode {
    return <TxtConsole
      txt={this.props.txt}
      command={this.state.command}
      console={this.state.console}
    />;
  }

  handleActionClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    let actionId = parseTxtActionId(event.currentTarget.id)
    this.setCommandActionId(actionId);
    event.stopPropagation();
  }
  setCommandActionId(actionId: TxtActionId) {
    this.setState((state: State<TxtObjectId>) => {
      let hasChanged = state.command.actionId !== actionId;
      if (hasChanged) {
        state.command.actionId = actionId;
        this.evalCommand({
          command: state.command,
          handled: false,
          objectPool: this.props.txt
        });
      }
      return state;
    });
  }

  setCommandObjectId(objectId: TxtObjectId) {
    this.setState((state: State<TxtObjectId>) => {
      let hasChanged = !state.command.objectIds.some((element: TxtObjectId) => {
        return element === objectId;
      });
      if (hasChanged) {
        state.command.objectIds.push(objectId);
        this.evalCommand({
          command: state.command,
          handled: false,
          objectPool: this.props.txt,
        });
      }
      return state;
    });
  }

  evalCommand(event: TxtActionEvent<TxtObjectId>) {
    setTimeout(() => {
      this.evalCommandOnScene(event);
      this.evalCommandOnObject(event);
      this.evalCommandOnAction(event);
      this.finalizeCommand(event);
    }, 10);
  }

  evalCommandOnObject(event: TxtActionEvent<TxtObjectId>) {
    if (!event.handled) {
      event.command.objectIds.some((objectId: TxtObjectId) => {
        let object = this.props.txt.getObjectProps(objectId);
        handleTxtActionEvent(object, event);
        return event.handled;
      });
    }
  }

  evalCommandOnScene(event: TxtActionEvent<TxtObjectId>) {
    if (!event.handled) {
      let scene = this.props.txt.getSceneProps();
      handleTxtActionEvent(scene, event);
    }
  }

  evalCommandOnAction(event: TxtActionEvent<TxtObjectId>) {
    if (!event.handled) {
      let action = this.props.txt.getActionProps(event.command.actionId);
      if (action !== undefined && action.targetObjectCount <= event.command.objectIds.length) {
        event.handled = true;
        if (event.command.response === "")
          event.command.response = this.props.txt.getStandardResponse();
      }
    }
  }

  finalizeCommand(event: TxtActionEvent<TxtObjectId>) {
    if (event.handled) {
      this.pushCommandToStack(event.command);
      this.clearCommand();
    }
  }

  pushCommandToStack(command: TxtCommandProps<TxtObjectId>) {
    this.setState((state: State<TxtObjectId>) => {
      let copy = makeCopyOfTxtCommandProps(command);
      state.console.stack.push(copy);
      if (state.console.stack.length > this.props.txt.console.stackSize) {
        state.console.stack.shift();
      }
      return state;
    });
  }

  handleBackgroundClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.clearCommand();
  }

  clearCommand() {
    this.setState((state: State<TxtObjectId>) => {
      let hasChanged =
        state.command.objectIds.length > 0
        || state.command.actionId !== TxtActionId.none;

      if (hasChanged) {
        state.command.objectIds = [];
        state.command.actionId = TxtActionId.none;
        state.command.response = "";
        state.console.commandCounter++;
        state.command.id = getCommandId(state.console.commandCounter);
      }
      return state;
    });
  }
}

export default TxtVenture;
