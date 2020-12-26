import React from "react";
import "./representationMultipleAssignments.css";

class AssignmentsPerLine extends React.Component {
  render() {
    return <option value={this.props.element}>{this.props.element}</option>;
  }
}

export default AssignmentsPerLine;
