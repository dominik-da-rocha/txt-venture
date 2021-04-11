import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import Venture from "./Venture";

Enzyme.configure({ adapter: new Adapter() });

describe("Venture", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Venture id="test" />);
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer.create(
      <Venture id="test" className="Test" key="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with venture dialog snapshot", () => {
    const tree = Renderer.create(
      <Venture id="test" className="Test" key="test" showVentureDialog={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with no editor", () => {
    const tree = Renderer.create(
      <Venture id="test" className="Test" key="test" isEditor={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("click action", () => {
    let wrapper = mount<Venture>(<Venture id="test" />);
    expect(wrapper.state().txt.logBook.length).toBe(0);
    wrapper.find("#test-actions-giveTo").simulate("click");
    expect(wrapper.state().txt.logBook.length).toBe(1);
  });

  it("change actions", () => {
    let wrapper = mount<Venture>(<Venture id="test" isEditor={true} />);
    expect(wrapper.state().txt.actions.close.name).toBe("Schließe");
    wrapper.find("#test-actions-editorButton").simulate("click");
    wrapper
      .find("#test-actions-propertyGrid-item-8")
      .simulate("change", { target: { value: "Hallo Welt" } });
    expect(wrapper.state().txt.actions.close.name).toBe("Hallo Welt");
  });

  it("change title property", () => {
    let wrapper = mount<Venture>(
      <Venture id="test" showVentureDialog={true} />
    );
    expect(wrapper.state().txt.title).toBe("TextVenture");
    wrapper
      .find("#test-propertyGrid-item-1")
      .simulate("change", { target: { value: "Foo" } });
    expect(wrapper.state().txt.title).toBe("Foo");
  });

  it("change show venture dialog", () => {
    let wrapper = mount<Venture>(
      <Venture id="test" showVentureDialog={false} isEditor={true} />
    );
    expect(wrapper.state().showVentureDialog).toBeFalsy();
    wrapper
      .find("#test-showDialogVenture")
      .simulate("click");
      expect(wrapper.state().showVentureDialog).toBeTruthy();
  });

  it("change hide venture dialog", () => {
    let wrapper = mount<Venture>(
      <Venture id="test" showVentureDialog={true} isEditor={true} />
    );
    expect(wrapper.state().showVentureDialog).toBeTruthy();
    wrapper
      .find("#test-dialog-x")
      .simulate("click");
      expect(wrapper.state().showVentureDialog).toBeFalsy();
  });
});
