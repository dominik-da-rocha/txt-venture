import "./Inventory.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

export interface InventoryProps extends ComponentProps {
  inventory: string[];
  objects: any;
}

export interface InventoryState extends ComponentState {}

export class Inventory extends Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props, {});
  }

  render() {
    return (
      <div id={this.props.id} className={this.className("Inventory")}>
        <h2>Inventory</h2>
        <div className="Content">{this.renderContent()}</div>
      </div>
    );
  }

  renderContent() {
    return this.props.inventory.map((object: string) => {
      return <li key={object}>{this.props.objects[object].name}</li>;
    });
  }
}

export default Inventory;
