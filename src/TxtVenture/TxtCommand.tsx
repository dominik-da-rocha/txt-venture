import "./TxtCommand.css";
import React from "react";
import { TxtObjectPool } from "./TxtObject";
import { TxtActionProps, TxtActionId } from "./TxtAction";
import { Stringable } from "./TxtTools";

export interface TxtCommandState {
}

export interface TxtCommandProps<TxtObjectId> {
  id: string;
  actionId: TxtActionId;
  objectIds: TxtObjectId[];
  response: string;
}

export interface TxtVentureCommandInterface<TxtObjectId> extends TxtObjectPool<TxtObjectId> {
  getActionProps(actionId: TxtActionId): TxtActionProps | undefined;
  getAndText(): string;
}

export interface TxtConsoleCommandInterface {
  responseIndent: number;
  prompt: string;
}

interface Props<TxtObjectId> {
  command: TxtCommandProps<TxtObjectId>;
  console: TxtConsoleCommandInterface;
  txt: TxtVentureCommandInterface<TxtObjectId>;
}

export function makeCopyOfTxtCommandProps<TxtObjectId>(command: TxtCommandProps<TxtObjectId>): TxtCommandProps<TxtObjectId> {
  let dest = {
    actionId: command.actionId,
    objectIds: command.objectIds.slice(),
    id: command.id,
    response: command.response,
  }
  return dest;
}

export class TxtCommand<TxtObjectId extends Stringable> extends React.Component<Props<TxtObjectId>, TxtCommandState> {

  render() {
    return <div className="TxtCommand" key={"commandId_" + this.props.command.id}>
      <div>
        <pre className="TxtPrompt">{this.props.console.prompt} </pre>
        {this.renderCommandAction()}
        {this.renderCommandObjects()}
      </div>
      {this.renderCommandResponse()}
    </div>;;
  }

  renderCommandAction(): React.ReactNode {
    let action = this.props.txt.getActionProps(this.props.command.actionId);
    let actionTitle = action === undefined ? "" : action.text;
    return <span>{actionTitle} </span>;
  }

  renderCommandObjects() {
    let objects = this.props.command.objectIds.map((objectId: TxtObjectId, index: number, objects: TxtObjectId[]) => {
      let object = this.props.txt.getObjectProps(objectId);
      if (object !== undefined) {
        let preposition = this.renderPreposition(index, objects.length);
        return <span key={object.id.toString()}>{object.text()} {preposition} </span>
      }
      else
        return undefined;
    });
    return objects;
  }

  renderPreposition(objectIndex: number, objectsLength: number): string {
    let prep = "";
    if (objectIndex === 0 && objectsLength > 1) {
      let action = this.props.txt.getActionProps(this.props.command.actionId);
      if (action !== undefined)
        prep = action.preposition;
      else
        prep = this.props.txt.getAndText();

    } else if (objectIndex > 0 && objectsLength > objectIndex + 1) {
      prep = this.props.txt.getAndText();
    }
    return prep;
  }

  renderCommandResponse(): React.ReactNode {
    if (this.props.command.response !== "") {
      return (
        <div className="TxtCommandResponse">
          {this.getResponsePrompt()}
          <span>{this.props.command.response}</span>
        </div>)
    }
    else {
      return undefined;
    }
  }
  getResponsePrompt(): React.ReactNode {
    let prompt = " ".repeat(
      this.props.console.prompt.length
      + this.props.console.responseIndent)
      + "<- ";
    return <pre className="TxtPrompt">{prompt}</pre>;

  }


}

export default TxtCommand;
