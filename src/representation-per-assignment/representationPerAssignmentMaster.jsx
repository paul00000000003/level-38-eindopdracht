import React from "react";
import { BrowserRouter } from "react-router-dom";
import RepresentationPerAssignment from "./representationPerAssignment";

class RepresentationPerAssignmentMaster extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <RepresentationPerAssignment scores={this.props.scores} />
      </BrowserRouter>
    );
  }
}

export default RepresentationPerAssignmentMaster;
