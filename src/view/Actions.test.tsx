import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import Actions from "./Actions";
import TxtVenture, { TxtAction, TxtActions } from "../model/TxtVenture";
import PropertyGrid, { PropertyGridProps } from "./PropertyGrid";

Enzyme.configure({ adapter: new Adapter() });

describe("Actions", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(
        <Actions
          id="test"
          txt={new TxtVenture()}
          onAction={(action: TxtAction) => {}}
          onChange={(actions: TxtActions) => {}}
        />
      );
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer.create(
      <Actions
        id="test"
        className="Test"
        key="test"
        txt={new TxtVenture()}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders disabled action snapshot", () => {
    let txt = new TxtVenture();
    txt.actions.close.isEnabled = false;
    const tree = Renderer.create(
      <Actions
        id="test"
        className="Test"
        key="test"
        txt={txt}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders disabled editor snapshot", () => {
    let txt = new TxtVenture();
    txt.isEditor = false;
    const tree = Renderer.create(
      <Actions
        id="test"
        className="Test"
        key="test"
        txt={txt}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders editor snapshot", () => {
    let txt = new TxtVenture();
    txt.isEditor = false;
    const tree = Renderer.create(
      <Actions
        id="test"
        className="Test"
        key="test"
        txt={txt}
        showEditDialog={true}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("click action", () => {
    let testAction: TxtAction = {
      isEnabled: false,
      name: "",
    };

    let wrapper = shallow<Actions>(
      <Actions
        id="test"
        txt={new TxtVenture()}
        onAction={(action: TxtAction) => {
          testAction = action;
        }}
        onChange={(actions: TxtActions) => {}}
      />
    );
    wrapper.find("#test-talkTo").simulate("click");
    expect(testAction.name).toBe("Rede mit");
  });

  it("click editor", () => {
    let wrapper = shallow<Actions>(
      <Actions
        id="test"
        txt={new TxtVenture()}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {}}
      />
    );
    expect(wrapper.state().showEditDialog).toBeFalsy();
    wrapper.find("#test-editorButton").simulate("click");
    expect(wrapper.state().showEditDialog).toBeTruthy();
  });

  it("click change from property grid", () => {
    let txt = new TxtVenture();
    let wrapper = mount<Actions>(
      <Actions
        id="test"
        txt={txt}
        showEditDialog={true}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {
          txt.actions = actions;
        }}
      />
    );
    expect(txt.actions.close.name).toBe("Schließe");
    wrapper
      .find("#test-propertyGrid-item-8")
      .simulate("change", { target: { value: "Hallo Welt" } });
    expect(txt.actions.close.name).toBe("Hallo Welt");
  });

  it("click hide dialoge", () => {
    let txt = new TxtVenture();
    let wrapper = mount<Actions>(
      <Actions
        id="test"
        txt={txt}
        showEditDialog={true}
        onAction={(action: TxtAction) => {}}
        onChange={(actions: TxtActions) => {
          txt.actions = actions;
        }}
      />
    );
    expect(wrapper.state().showEditDialog).toBeTruthy();
    wrapper.find("#test-dialog-x").simulate("click");
    expect(wrapper.state().showEditDialog).toBeFalsy();
  });
});
