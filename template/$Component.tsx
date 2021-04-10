import "./$Component.css";
import React from "react";

export interface $ComponentState { }

export interface $ComponentProps { }

export class $Component extends React.Component<$ComponentProps, $ComponentState> {
  constructor(props: $ComponentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="$Component">
      {this.props.children}
    </div>;
  }
}

export default $Component;
