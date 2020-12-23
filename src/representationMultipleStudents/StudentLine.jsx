import React from "react";
import "./studentLinechart.css";

class StudentLine extends React.Component {
  render() {
    let nameStudent = this.props.name;
    return (
      <li className="lineMultipleStudents">
        <input
          type="checkbox"
          name="studentDash"
          onChange={(e) => this.props.handleChange(this.props.index, e.target)}
        />
        {nameStudent}
      </li>
    );
  }
}

export default StudentLine;
