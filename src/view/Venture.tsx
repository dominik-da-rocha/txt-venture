import "./Venture.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

export interface VentureProps extends ComponentProps { }

export interface VentureState extends ComponentState { }

export class Venture extends Component<VentureProps, VentureState> {
  constructor(props: VentureProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div id={this.props.id} className={this.className()}>
      {this.props.children}
    </div>;
  }
}

export default Venture;
