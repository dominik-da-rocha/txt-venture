import "./Venture.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";
import Scene from "./Scene";
import Inventory from "./Inventory";
import Actions from "./Actions";
import Console from "./Console";
import TxtVenture, { TxtAction } from "../model/TxtVenture";
import { ModalDialog } from "./ModalDialog";
import PropertyGrid from "./PropertyGrid";

export interface VentureProps extends ComponentProps {
  showVentureDialog?: boolean;
  isEditor?: boolean;
}

export interface VentureState extends ComponentState {
  txt: TxtVenture;
  showVentureDialog: boolean;
}

function makeTxt(props: VentureProps): TxtVenture {
  let txt = new TxtVenture();
  txt.isEditor = props.isEditor ? true : false;
  return txt;
}

export class Venture extends Component<VentureProps, VentureState> {
  constructor(props: VentureProps) {
    super(props, {
      txt: makeTxt(props),
      showVentureDialog: props.showVentureDialog ? true : false,
    });

    this.showDialogVenture = this.showDialogVenture.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  render() {
    return (
      <div id={this.props.id} className={this.className("Venture")}>
        <div className="Title">
          <h1>
            <span>{this.state.txt.title}</span>
            {this.renderEditButtonVenture()}
          </h1>
        </div>
        
        <Scene id={this.makeId("scene")} scene={this.state.txt.scenes[this.state.txt.scene]} />
        
        <Inventory
          id={this.makeId("inventory")}
          inventory={this.state.txt.inventory}
          objects={this.state.txt.objects}
        />

        <Actions
          id={this.makeId("actions")}
          txt={this.state.txt}
          onAction={(action: TxtAction) => {
            this.setState((state: VentureState) => {
              TxtVenture.action(state.txt, action);
              return state;
            });
          }}
          onChange={(actions: any) => {
            this.setState((state: VentureState) => {
              state.txt.actions = actions;
              return state;
            });
          }}
        />

        <Console id={this.makeId("console")} logBook={this.state.txt.logBook} />

        {this.renderVentureDialog()}
      </div>
    );
  }

  renderVentureDialog() {
    if (this.state.showVentureDialog) {
      return (
        <ModalDialog
          id={this.makeId("dialog")}
          title="Venture"
          onCancel={this.hideDialog}
          onOkay={this.hideDialog}
        >
          <PropertyGrid
            id={this.makeId("propertyGrid")}
            object={this.state.txt}
            onChange={(object: TxtVenture) => {
              this.setState((state: VentureState) => {
                state.txt = object;
                return state;
              });
            }}
          />
        </ModalDialog>
      );
    }
  }

  renderEditButtonVenture() {
    if (this.state.txt.isEditor) {
      return (
        <button
          onClick={this.showDialogVenture}
          id={this.makeId("showDialogVenture")}
          className="EditorButton"
        />
      );
    } else {
      return undefined;
    }
  }

  showDialogVenture() {
    this.setState((state: VentureState) => {
      state.showVentureDialog = true;
      return state;
    });
  }

  hideDialog() {
    this.setState((state: VentureState) => {
      state.showVentureDialog = false;
      return state;
    });
  }
}

export default Venture;
