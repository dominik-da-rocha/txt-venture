import React from "react";
import ReactDOM from "react-dom";
import TxtAction from "./TxtAction";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtAction />, div);
  ReactDOM.unmountComponentAtNode(div);
});
