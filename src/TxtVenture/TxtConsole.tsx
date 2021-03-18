import "./TxtConsole.css";
import React from "react";
import TxtCommand, { TxtCommandProps, TxtVentureCommandInterface, TxtConsoleCommandInterface } from "./TxtCommand";

export interface TxtConsoleProps<TxtObjectId>
  extends TxtConsoleCommandInterface {
  stack: TxtCommandProps<TxtObjectId>[];
  commandCounter: number;
}

interface Props<TxtObjectId> {
  console: TxtConsoleProps<TxtObjectId>;
  command: TxtCommandProps<TxtObjectId>;
  txt: TxtVentureCommandInterface<TxtObjectId>;
}

interface State {
}

export class TxtConsole<TxtObjectId> extends React.Component<Props<TxtObjectId>, State> {
  constructor(props: Props<TxtObjectId>) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className="TxtConsole">
      {this.renderCommand(this.props.command)}
      {this.renderStack()}
    </div>);
  }
  renderStack(): React.ReactNode {
    return this.props.console.stack.slice(0).reverse().map((command: TxtCommandProps<TxtObjectId>) => {
      return this.renderCommand(command);
    })
  }

  renderCommand(command: TxtCommandProps<TxtObjectId>): React.ReactNode {
    return <TxtCommand
      key={command.id}
      command={command}
      console={this.props.console}
      txt={this.props.txt} />
  }

}

export default TxtConsole;
