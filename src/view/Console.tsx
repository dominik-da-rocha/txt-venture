import "./Console.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

export interface ConsoleProps extends ComponentProps {
  logBook: string[];
}

export interface ConsoleState extends ComponentState {}

export class Console extends Component<ConsoleProps, ConsoleState> {
  constructor(props: ConsoleProps) {
    super(props, {});
  }

  render() {
    return (
      <div id={this.props.id} className={this.className("Console")}>
        {this.props.logBook}
      </div>
    );
  }
}

export default Console;
