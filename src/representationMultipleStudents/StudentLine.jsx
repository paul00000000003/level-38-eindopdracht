import React from "react";
import "./studentLinechart.css";

class StudentLine extends React.Component {
  render() {
    let nameStudent = this.props.name;
    return (
      <li className="regelMeerdereStudenten">
        <input
          type="checkbox"
          name="studentvink"
          onChange={(e) => this.props.handlechange(this.props.index, e.target)}
        />
        {nameStudent}
      </li>
    );
  }
}

export default StudentLine;
