import React from "react";
import ReactDOM from "react-dom";
import TxtVenture from "./TxtVenture";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TxtVenture />, div);
  ReactDOM.unmountComponentAtNode(div);
});
