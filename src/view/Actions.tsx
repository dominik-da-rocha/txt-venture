import "./Actions.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";
import TxtVenture, { TxtActions, TxtAction } from "../model/TxtVenture";
import ModalDialog from "./ModalDialog";
import PropertyGrid from "./PropertyGrid";

export interface ActionsProps extends ComponentProps {
  txt: TxtVenture;
  onAction(action: TxtAction): void;
  onChange(actions: TxtActions): void;
  showEditDialog?: boolean;
}

export interface ActionsState extends ComponentState {
  showEditDialog: boolean;
}

export class Actions extends Component<ActionsProps, ActionsState> {
  constructor(props: ActionsProps) {
    super(props, { showEditDialog: props.showEditDialog ? true : false });
    this.hideDialog = this.hideDialog.bind(this);
    this.showDialog = this.showDialog.bind(this);
  }

  render() {
    return (
      <div id={this.props.id} className={this.className("Actions")}>
        {this.renderActions()}
        {this.renderEditButton()}
        {this.renderEditor()}
      </div>
    );
  }

  renderActions() {
    let actions: any[] = [];
    let a = this.props.txt.actions as any;
    for (let name in a) {
      let id = this.makeId(name);
      let action = a[name];
      if (action.isEnabled) {
        actions.push(
          <div
            key={id}
            id={id}
            className="Action"
            onClick={() => {
              this.props.onAction(action);
            }}
          >
            {action.name}
          </div>
        );
      }
    }

    return actions;
  }

  renderEditButton() {
    if (this.props.txt.isEditor) {
      return (
        <button
          onClick={this.showDialog}
          className="EditorButton"
          id={this.makeId("editorButton")}
        />
      );
    } else {
      return undefined;
    }
  }

  renderEditor() {
    if (this.state.showEditDialog) {
      return (
        <ModalDialog
          id={this.makeId("dialog")}
          title="Actions"
          onCancel={this.hideDialog}
          onOkay={this.hideDialog}
        >
          <PropertyGrid
            id={this.makeId("propertyGrid")}
            object={this.props.txt.actions}
            objectName={"actions"}
            onChange={(object: TxtActions) => {
              this.props.onChange(object);
            }}
          />
        </ModalDialog>
      );
    }
  }

  hideDialog() {
    this.setState((state: ActionsState) => {
      state.showEditDialog = false;
      return state;
    });
  }

  showDialog() {
    this.setState((state: ActionsState) => {
      state.showEditDialog = true;
      return state;
    });
  }
}

export default Actions;
