import React from "react";
import { Link } from "react-router-dom";
import "./representationPerAssignment.css";

class AssignmentPerLinkLine extends React.Component {
  render() {
    return (
      <li className="regel">
        <Link
          to={this.props.str}
          onClick={(e) =>
            this.props.handlehisto(this.props.index, e.target, this.props.el)
          }
          className="linkklas"
        >
          {this.props.el}
        </Link>
      </li>
    );
  }
}

export default AssignmentPerLinkLine;
