import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from 'react-test-renderer';
import React from "react";
import $Component from "./$Component";

Enzyme.configure({ adapter: new Adapter() });


describe("$Component", () => {

  it("renders without crashing", () => {
    expect(() => {
      shallow(<$Component id="test" />);
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer
    .create(<$Component id="test" className="Test" key="test" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
