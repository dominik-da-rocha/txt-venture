import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import Component, { ComponentProps, ComponentState } from "./Component";

Enzyme.configure({ adapter: new Adapter() });

class TestComponent extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div id={this.props.id}>
        <div id={this.makeId("child1")}></div>
        <div id={this.makeId("child2")}></div>
      </div>
    );
  }
}

describe("Component", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Component id="component" />);
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer.create(
      <Component id="test" className="Test" key="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders className Component", () => {
    let wrapper = shallow(<Component id="component" />);
    expect(wrapper.hasClass("Component")).toBeTruthy();
  });

  it("renders find by id", () => {
    let wrapper = shallow(<Component id="myId" />);
    expect(wrapper.find("#myId")).toHaveLength(1);
  });

  it("renders className defined by user", () => {
    let wrapper = shallow(<Component id="component" className="Fancy" />);
    expect(wrapper.hasClass("Fancy")).toBeTruthy();
  });

  it("renders id", () => {
    let wrapper = shallow(<TestComponent id="parent"></TestComponent>);
    expect(wrapper.find("#parent-child1")).toHaveLength(1);
    expect(wrapper.find("#parent-child2")).toHaveLength(1);
  });
});
