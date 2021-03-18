import "./TxtInventory.css";
import React from "react";
import { Stringable } from "./TxtTools";
import { TxtVentureRenderObject } from "./TxtVenture";
import { TxtObjectOwnerImpl } from "./TxtObject";


export class TxtInventoryProps<TxtObjectId>
  extends TxtObjectOwnerImpl<TxtObjectId> {
}

interface Props<TxtObjectId> {
  inventory: TxtInventoryProps<TxtObjectId>
  txt: TxtVentureRenderObject<TxtObjectId>;
}

interface State { }

export class TxtInventory<TxtObjectId extends Stringable> extends React.Component<Props<TxtObjectId>, State> {
  constructor(props: Props<TxtObjectId>) {
    super(props);
    this.state = {};
  }


  render() {
    return <div className="TxtInventory">
      <h2>TxtInventory</h2>
      {this.props.inventory.objectIds.map((objectId: TxtObjectId) => {
        return <li key={"inventory_" + objectId.toString()} >
          {this.props.txt.renderObject(objectId)}
        </li>;
      })
      }
    </div >;
  }
}

export default TxtInventory;
