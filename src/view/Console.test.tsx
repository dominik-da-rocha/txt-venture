import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from 'react-test-renderer';
import React from "react";
import Console from "./Console";

Enzyme.configure({ adapter: new Adapter() });


describe("Console", () => {

  it("renders without crashing", () => {
    expect(() => {
      shallow(<Console id="test" logBook={[]} />);
    }).not.toThrow();
  });

  it("renders snapshot", () => {
    const tree = Renderer
    .create(<Console id="test" className="Test" key="test" logBook={[]} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
