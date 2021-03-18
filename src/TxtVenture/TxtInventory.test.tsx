import React from "react";
import ReactDOM from "react-dom";
import TxtInventory from "./TxtInventory";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtInventory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
