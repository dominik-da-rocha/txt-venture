import "./TxtAction.css";
import React from "react";
import { TxtCommandProps } from "./TxtCommand";
import { TxtObjectPool } from "./TxtObject";

export enum TxtActionId {
  none,
  open,
  close,
  push,
  pull,
  walkTo,
  pickUp,
  talkTo,
  give,
  use,
}

export function parseTxtActionId(text: string) {
  switch (text) {
    case TxtActionId.none.toString():
      return TxtActionId.none;
    case TxtActionId.open.toString():
      return TxtActionId.open;
    case TxtActionId.close.toString():
      return TxtActionId.close;
    case TxtActionId.push.toString():
      return TxtActionId.push;
    case TxtActionId.pull.toString():
      return TxtActionId.pull;
    case TxtActionId.walkTo.toString():
      return TxtActionId.walkTo;
    case TxtActionId.pickUp.toString():
      return TxtActionId.pickUp;
    case TxtActionId.talkTo.toString():
      return TxtActionId.talkTo;
    case TxtActionId.give.toString():
      return TxtActionId.give;
    case TxtActionId.use.toString():
      return TxtActionId.use;
  }
  return TxtActionId.none;
}

export function handleTxtActionEvent<TxtObjectId>(handler: TxtActionHandler<TxtObjectId> | undefined, event: TxtActionEvent<TxtObjectId>) {

  let handleAction = function (callback: ((event: TxtActionEvent<TxtObjectId>) => void) | undefined, event: TxtActionEvent<TxtObjectId>) {
    if (callback !== undefined) {
      callback(event);
    }
  }

  if (handler !== undefined) {
    switch (event.command.actionId) {
      case TxtActionId.none:
        return undefined;
      case TxtActionId.open:
        return handleAction(handler.onOpen, event);
      case TxtActionId.close:
        return handleAction(handler.onClose, event);
      case TxtActionId.push:
        return handleAction(handler.onPush, event);
      case TxtActionId.pull:
        return handleAction(handler.onPull, event);
      case TxtActionId.walkTo:
        return handleAction(handler.onWalkTo, event);
      case TxtActionId.pickUp:
        return handleAction(handler.onPickUp, event);
      case TxtActionId.talkTo:
        return handleAction(handler.onTalkTo, event);
      case TxtActionId.give:
        return handleAction(handler.onGive, event);
      case TxtActionId.use:
        return handleAction(handler.onUse, event);
    }
  }
}

export interface TxtActionEvent<TxtObjectId> {
  command: TxtCommandProps<TxtObjectId>;
  objectPool: TxtObjectPool<TxtObjectId>;
  handled: boolean;
}

export interface TxtActionHandler<TxtObjectId> {
  onOpen?: (event: TxtActionEvent<TxtObjectId>) => void;
  onClose?: (event: TxtActionEvent<TxtObjectId>) => void;
  onPush?: (event: TxtActionEvent<TxtObjectId>) => void;
  onPull?: (event: TxtActionEvent<TxtObjectId>) => void;
  onWalkTo?: (event: TxtActionEvent<TxtObjectId>) => void;
  onPickUp?: (event: TxtActionEvent<TxtObjectId>) => void;
  onTalkTo?: (event: TxtActionEvent<TxtObjectId>) => void;
  onGive?: (event: TxtActionEvent<TxtObjectId>) => void;
  onUse?: (event: TxtActionEvent<TxtObjectId>) => void;
}

export interface TxtActionProps {
  id: TxtActionId;
  text: string;
  targetObjectCount: number;
  preposition: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface Props {
  action: TxtActionProps;
}

interface State {
}

export class TxtAction extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <span
      id={this.props.action.id.toString()}
      className="TxtAction"
      onClick={this.props.action.onClick}>
      {this.props.action.text}
    </span>;
  }
}

export default TxtAction;
