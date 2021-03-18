import "./TxtObject.css";
import React from "react";
import { Identifiable, Stringable } from "./TxtTools";
import { TxtActionHandler } from "./TxtAction";

export interface TxtObjectState { }

export interface TxtVentureObjectInterface<TxtObjectId> {
  setCommandObjectId(objectId: TxtObjectId): void;
}


export interface TxtObjectOwner<TxtObjectId> {
  addObject(objectId: TxtObjectId): boolean;
  removeObject(objectId: TxtObjectId): boolean;
  hasObject(objectId: TxtObjectId): boolean;
  giveObjectTo(objectId: TxtObjectId, other: TxtObjectOwner<TxtObjectId>): boolean;
  updateOwner(pool: TxtObjectPool<TxtObjectId>): void
}

export interface TxtObjectPool<TxtObjectId> {
  getObjectProps(objectId: TxtObjectId): TxtObjectProps<TxtObjectId> | undefined;
}

export class TxtObjectOwnerImpl<TxtObjectId> implements TxtObjectOwner<TxtObjectId> {

  objectIds: TxtObjectId[] = [];
  objectPool?: TxtObjectPool<TxtObjectId>;

  hasObject(id: TxtObjectId): boolean {
    return this.objectIds.find((inList: TxtObjectId) => {
      return inList === id;
    }) !== undefined;
  }

  addObject(objectId: TxtObjectId): boolean {
    if (!this.hasObject(objectId) && this.objectPool !== undefined) {
      let object = this.objectPool.getObjectProps(objectId);
      if (object !== undefined && object.owner === undefined) {
        object.owner = this;
        this.objectIds.push(objectId);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  removeObject(objectId: TxtObjectId): boolean {
    let index = -1;
    let id = this.objectIds.find((inList: TxtObjectId) => {
      index++;
      return inList === objectId;
    });
    if (id !== undefined) {
      if (this.objectPool !== undefined) {
        let object = this.objectPool.getObjectProps(objectId);
        if (object !== undefined && object.owner === this) {
          object.owner = undefined;
          this.objectIds.slice(index, index);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  giveObjectTo(objectId: TxtObjectId, other: TxtObjectOwner<TxtObjectId>): boolean {
    if (this.removeObject(objectId)) {
      if (other.addObject(objectId)) {
        return true;
      } else {
        this.addObject(objectId);
        return false;
      }
    } else {
      return false;
    }
  }

  updateOwner(pool: TxtObjectPool<TxtObjectId>): void {
    this.objectIds.forEach((objectId: TxtObjectId) => {
      let object = pool.getObjectProps(objectId);
      if (object !== undefined && object.owner === undefined)
        object.owner = this;
    });
    this.objectPool = pool;
  }

}

export interface TxtObjectProps<TxtObjectId>
  extends Identifiable<TxtObjectId>, TxtActionHandler<TxtObjectId> {
  text(): React.ReactNode;
  owner?: TxtObjectOwner<TxtObjectId>;
}

interface Props<TxtObjectId> {
  object: TxtObjectProps<TxtObjectId>;
  txt: TxtVentureObjectInterface<TxtObjectId>;
}

export class TxtObject<TxtObjectId extends Stringable> extends React.Component<Props<TxtObjectId>, TxtObjectState> {

  constructor(props: Props<TxtObjectId>) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <span
      id={this.props.object.id.toString()}
      className="TxtObject"
      onClick={this.handleClick}>
      {this.props.object.text()}
    </span>;
  }

  handleClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    this.props.txt.setCommandObjectId(this.props.object.id);
    event.stopPropagation();
  }

}

export default TxtObject;
