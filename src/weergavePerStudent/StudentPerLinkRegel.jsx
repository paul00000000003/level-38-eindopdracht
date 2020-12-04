import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./studentHistogram.css";

class StudentPerLinkRegel extends React.Component {
  render() {
    return (
      <li className="regel">
        <input
          type="checkbox"
          name="studentvink"
          onChange={(e) => this.props.handlechange(this.props.index, e.target)}
        />
        <Link
          to={this.props.str}
          className="linkklas"
          onClick={(e) => this.props.handlehisto(this.props.index, e.target)}
        >
          {this.props.el}
        </Link>
      </li>
    );
  }
}

export default StudentPerLinkRegel;
