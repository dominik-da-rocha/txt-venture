import "./Scene.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";
import { TxtScene } from "../model/TxtVenture";

export interface SceneProps extends ComponentProps {
  scene: TxtScene;
}

export interface SceneState extends ComponentState {}

export class Scene extends Component<SceneProps, SceneState> {
  constructor(props: SceneProps) {
    super(props, {});
  }

  render() {
    return (
      <div id={this.props.id} className={this.className("Scene")}>
        <h2>{this.props.scene.name}</h2>
        <div className="Content">{this.props.scene.content}</div>
      </div>
    );
  }
}

export default Scene;
