import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import PropertyGrid from "./PropertyGrid";

Enzyme.configure({ adapter: new Adapter() });

class TestChild {
  value: boolean = false;
}

class TestObject {
  state: boolean = false;
  text: string = "test";
  count: number = 1;
  private_: string = "this is private";
  child: TestChild = new TestChild();
}

describe("PropertyGrid", () => {
  let test = new TestObject();
  it("renders without crashing", () => {
    expect(() => {
      shallow(
        <PropertyGrid
          id="test"
          object={test}
          onChange={(test: TestObject) => {}}
        />
      );
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    let test = new TestObject();
    const tree = Renderer.create(
      <PropertyGrid
        id="test"
        className="Test"
        key="test"
        object={test}
        onChange={(test: TestObject) => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("changes expander", () => {
    let test = new TestObject();
    let wrapper = shallow(
      <PropertyGrid
        id="test"
        object={test}
        onChange={(test: TestObject) => {}}
      />
    );
    expect((wrapper.state() as any).items).toBeDefined();
    expect((wrapper.state() as any).items["item-4"]).toBeUndefined();

    wrapper
      .find("#test-item-4")
      .simulate("change", { target: { checked: false } });
    expect((wrapper.state() as any).items["item-4"]).toBeDefined();
    expect((wrapper.state() as any).items["item-4"]).toBeTruthy();

    wrapper
      .find("#test-item-4")
      .simulate("change", { target: { checked: true } });
    expect((wrapper.state() as any).items["item-4"]).toBeFalsy();
  });

  it("changes boolean value", () => {
    let test = new TestObject();
    let wrapper = shallow(
      <PropertyGrid
        id="test"
        object={test}
        onChange={(test: TestObject) => {}}
      />
    );
    expect((wrapper.state() as any).object.child.value).toBeFalsy();

    wrapper
      .find("#test-item-5")
      .simulate("change", { target: { checked: true } });
    expect((wrapper.state() as any).object.child.value).toBeTruthy();
  });

  it("changes string value", () => {
    let test = new TestObject();
    let wrapper = shallow(
      <PropertyGrid
        id="test"
        object={test}
        onChange={(test: TestObject) => {}}
      />
    );
    expect((wrapper.state() as any).object.text).toBe("test");

    wrapper
      .find("#test-item-2")
      .simulate("change", { target: { value: "Hello World" } });
    expect((wrapper.state() as any).object.text).toBe("Hello World");
  });

  it("changes number value", () => {
    let test = new TestObject();
    let wrapper = shallow(
      <PropertyGrid
        id="test"
        object={test}
        onChange={(test: TestObject) => {}}
      />
    );
    expect((wrapper.state() as any).object.count).toBe(1);

    wrapper
      .find("#test-item-3")
      .simulate("change", { target: { valueAsNumber: 123 } });
    expect((wrapper.state() as any).object.count).toBe(123);
  });
});
