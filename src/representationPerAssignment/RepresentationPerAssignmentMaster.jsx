import React from "react";
import { BrowserRouter } from "react-router-dom";
import RepresentationPerAssignment from "./RepresentationPerAssignment";

class RepresentationPerAssignmentMaster extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <RepresentationPerAssignment />
      </BrowserRouter>
    );
  }
}

export default RepresentationPerAssignmentMaster;
