import "./$Component.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

export interface $ComponentProps extends ComponentProps { }

export interface $ComponentState extends ComponentState { }

export class $Component extends Component<$ComponentProps, $ComponentState> {
  constructor(props: $ComponentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div id={this.props.id} className={this.className()}>
      {this.props.children}
    </div>;
  }
}

export default $Component;
