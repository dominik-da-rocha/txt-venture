import "./TxtObject.css";
import React from "react";
import { Identifiable } from "./TxtTools";
import { TxtCommandEvent } from "./TxtVenture";

export interface TxtObjectState { }

export interface TxtObjectProps extends Identifiable {
  id: string,
  text: () => string,
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  onCommand?: (command: TxtCommandEvent) => void,
}

export class TxtObject extends React.Component<TxtObjectProps, TxtObjectState> {

  constructor(props: TxtObjectProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <span
      id={this.props.id}
      className="TxtObject"
      onClick={this.props.onClick}>
      {this.props.text()}
    </span>;
  }
}

export default TxtObject;
