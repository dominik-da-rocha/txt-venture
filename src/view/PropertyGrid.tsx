import "./PropertyGrid.css";
import React, { ChangeEvent } from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

export interface PropertyGridProps extends ComponentProps {
  object: any;
  onChange(object: any): void;
}

export interface PropertyGridState extends ComponentState {
  object: any;
  items: any;
}

export class PropertyGrid extends Component<
  PropertyGridProps,
  PropertyGridState
> {
  key: number = 0;

  constructor(props: PropertyGridProps) {
    super(props, {
      object: props.object,
      items: {},
    });
  }

  render() {
    this.key = 0;
    return (
      <div id={this.props.id} className={this.className("PropertyGrid")}>
        {this.renderRows(this.state.object, "object")}
      </div>
    );
  }

  renderRows(object: any, path: string): React.ReactNode {
    let items: any[] = [];
    for (let name in object) {
      if (!name.endsWith("_")) {
        let fullName = path + "." + name;
        let type = typeof object[name] === "object" ? "Object" : "Value";
        let key = "item-" + ++this.key;
        let id = this.makeId(key);
        items.push(
          <div key={key} className={type}>
            {this.renderExpander(type, id, key)}
            <label className="Caption" htmlFor={id}>
              {name}
            </label>
            <div key={key} className={"ExpanderContent"}>
              {this.renderValue(object[name], id, fullName)}
            </div>
          </div>
        );
      }
    }
    return items;
  }

  renderExpander(type: string, id: string, key: string) {
    return type === "Object" ? (
      <input
        className="Expander"
        type="checkbox"
        id={id}
        defaultChecked={this.state.items[key] ? false : true}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          let value = !event.target.checked;
          this.setState((state: PropertyGridState) => {
            state.items[key] = value;
            return state;
          });
        }}
      />
    ) : undefined;
  }

  renderValue(object: any, id: string, fullName: string): React.ReactNode {
    switch (typeof object) {
      case "boolean":
        return (
          <input
            id={id}
            className="Editor"
            type="checkbox"
            defaultChecked={object}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              this.setObject(fullName, event.target.checked);
            }}
          />
        );
      case "string":
        return (
          <input
            id={id}
            className="Editor"
            type="text"
            defaultValue={object}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              this.setObject(fullName, event.target.value);
            }}
          />
        );
      case "number":
        return (
          <input
            id={id}
            className="Editor"
            type="number"
            defaultValue={object.toString()}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              this.setObject(fullName, event.target.valueAsNumber);
            }}
          />
        );
      case "object":
        return this.renderRows(object, fullName);
    }
  }

  setObject(fullName: string, value: string | boolean | number) {
    this.setState((state: PropertyGridState) => {
      let object: any = state;
      let path = fullName.split(".");
      path.forEach((name: string) => {
        if (name === path[path.length - 1]) {
          object[name] = value;
        } else {
          object = object[name];
        }
      });
      this.props.onChange(state.object);
      return state;
    });
  }
}

export default PropertyGrid;
