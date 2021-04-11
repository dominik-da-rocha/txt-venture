import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from "react-test-renderer";
import React from "react";
import ModalDialog from "./ModalDialog";

Enzyme.configure({ adapter: new Adapter() });

describe("ModalDialog", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(
        <ModalDialog
          id="test"
          title="Title"
          onOkay={() => {}}
          onCancel={() => {}}
        />
      );
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer.create(
      <ModalDialog
        id="test"
        title="Title"
        onOkay={() => {}}
        onCancel={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders no okay callback", () => {
    const tree = Renderer.create(
      <ModalDialog
        id="test"
        title="Title"
        onCancel={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders no cancel callback", () => {
    const tree = Renderer.create(
      <ModalDialog
        id="test"
        title="Title"
        onOkay={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
