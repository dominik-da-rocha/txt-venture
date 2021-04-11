import "./ModalDialog.css";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

export interface ModalDialogProps extends ComponentProps {
  title: string;
  onOkay?: () => void;
  onCancel?: () => void;
}

export interface ModalDialogState extends ComponentState {}

export class ModalDialog extends Component<ModalDialogProps, ModalDialogState> {
  constructor(props: ModalDialogProps) {
    super(props, {});
  }

  render() {
    return (
      <div id={this.props.id} className={this.className("ModalDialog")}>
        <div className="Dialog">
          <div className="Header">
            <span>{this.props.title}</span>
            <span
              className="X"
              id={this.makeId("x")}
              onClick={this.props.onCancel}
            >
              X
            </span>
          </div>
          <div className="Content">{this.props.children}</div>
          <div className="Footer">
            {this.props.onOkay ? (
              <button id={this.makeId("okay")} onClick={this.props.onOkay}>
                Okay
              </button>
            ) : undefined}
            {this.props.onCancel ? (
              <button id={this.makeId("cancel")} onClick={this.props.onCancel}>
                Cancel
              </button>
            ) : undefined}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDialog;
