import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import Inventory from "./Inventory";

Enzyme.configure({ adapter: new Adapter() });

describe("Inventory", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Inventory id="test" inventory={[]} />);
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer.create(
      <Inventory id="test" className="Test" key="test" inventory={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
