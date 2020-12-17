import React from "react";
import "./representationMultipleAssignments.css";

class AssignmentsPerLine extends React.Component {
  render() {
    return (
      <p className="assignmentPrint">
        <input
          className="assignmentInput"
          type="checkbox"
          name="studentvink"
          onChange={(e) => this.props.handlechange(this.props.index, e.target)}
        />
        {this.props.element}
      </p>
    );
  }
}

export default AssignmentsPerLine;
