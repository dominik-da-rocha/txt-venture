import React from "react";

export interface ComponentProps {
  id: string;
  children?: React.ReactNode;
  key?: string;
  className?: string;
}

export interface ComponentState {}

export class Component<
  P extends ComponentProps,
  S extends ComponentState
> extends React.Component<P, S> {
  constructor(props: P, state: S) {
    super(props);
    this.state = state;
  }

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

  className(name?: string) {
    let names: string[] = ["Component"];
    if (name) {
      names.push(name);
    }
    if (this.props.className) {
      names.push(this.props.className as string);
    }
    return names.join(" ");
  }
}

export default Component;
