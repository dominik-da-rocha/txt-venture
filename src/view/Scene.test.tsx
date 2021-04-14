import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import Scene from "./Scene";
import { title } from "process";

Enzyme.configure({ adapter: new Adapter() });

describe("Scene", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Scene id="test" scene={{ id: "", name: "", content: "" }} />);
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer.create(
      <Scene
        id="test"
        className="Test"
        key="test"
        scene={{ id: "scene1", name: "Hello", content: "World" }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
