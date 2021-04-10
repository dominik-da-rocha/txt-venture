import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Renderer from 'react-test-renderer';
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
    const tree = Renderer
    .create(<Venture id="test" className="Test" key="test" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
