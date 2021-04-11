import "./Inventory.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";
import { TxtObject } from "../model/TxtVenture";

export interface InventoryProps extends ComponentProps {
  inventory: TxtObject[];
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
    let items: any[] = [];
    for (let i = 0; i < 100; ++i) {
      items.push(<div key={"item" + i}>{"item" + i}</div>);
    }
    return items;
  }
}

export default Inventory;
