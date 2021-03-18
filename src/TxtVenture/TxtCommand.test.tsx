import React from "react";
import ReactDOM from "react-dom";
import TxtCommand from "./TxtCommand";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtCommand />, div);
  ReactDOM.unmountComponentAtNode(div);
});
