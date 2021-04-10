import React from "react";

export interface ComponentState {}

export interface ComponentProps {
  id: string;
  children?: React.ReactNode;
  key?: string;
  className?: string;
}

export class Component<
  P extends ComponentProps,
  S extends ComponentState
> extends React.Component<P, S> {
  render() {
    return (
      <div id={this.props.id} className={this.className()}>
        {this.props.children}
      </div>
    );
  }

  makeId(id: string): string {
    return this.props.id + "-" + id;
  }

  className() {
    let names: string[] = ["Component"];
    if (this.props.className) {
      names.push(this.props.className);
    }
    return names.join(" ");
  }
}

export default Component;
