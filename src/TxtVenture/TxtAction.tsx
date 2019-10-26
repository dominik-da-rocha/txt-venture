import "./TxtAction.css";
import React from "react";
import { Identifiable } from "./TxtTools";

export interface TxtActionState {
}

export interface TxtActionProps extends Identifiable {
  title: string;
  maxObjectLength: number;
  preposition: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export class TxtAction extends React.Component<TxtActionProps, TxtActionState> {
  constructor(props: TxtActionProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <span
      id={this.props.id}
      className="TxtAction"
      onClick={this.props.onClick}>
      {this.props.title}
    </span>;
  }
}

export default TxtAction;
