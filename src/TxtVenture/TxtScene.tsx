import "./TxtScene.css";
import React from "react";
import { Identifiable } from "./TxtTools";
import { TxtCommandEvent } from "./TxtVenture";

export interface TxtSceneState {
}

export interface TxtSceneProps extends Identifiable {
  id: string,
  title: string,
  text(): React.ReactNode,
  onCommand?: (command: TxtCommandEvent) => void,
}

export class TxtScene extends React.Component<TxtSceneProps, TxtSceneState> {
  constructor(props: TxtSceneProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="TxtScene">
      <h2>{this.props.title}</h2>
      {this.props.text()}
    </div>;
  }
}

export default TxtScene;
