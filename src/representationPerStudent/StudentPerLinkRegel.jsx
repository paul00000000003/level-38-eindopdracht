import React from "react";
import { Link } from "react-router-dom";
import "./representationPerStudent.css";

class StudentPerLinkRegel extends React.Component {
  render() {
    const styles = { listStyleType: "none", color: "white" };
    return (
      <li style={styles}>
        <Link
          className="linkklas"
          style={{ color: "white" }}
          to={this.props.str}
          onClick={(e) =>
            this.props.makegraph(this.props.index, e.target, this.props.el)
          }
        >
          {this.props.el}
        </Link>
      </li>
    );
  }
}

export default StudentPerLinkRegel;
