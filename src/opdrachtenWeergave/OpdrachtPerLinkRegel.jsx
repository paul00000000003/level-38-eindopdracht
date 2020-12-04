import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./weergavePerOpdracht.css";

class OpdrachtPerLinkRegel extends React.Component {
  render() {
    return (
      <li className="regel">
        <input
          type="checkbox"
          name="opdrachtvink"
          onChange={(e) => this.props.handlechange(this.props.index, e.target)}
        />
        <Link
          to={this.props.str}
          onClick={(e) => this.props.handlehisto(this.props.index, e.target)}
          className="linkklas"
        >
          {this.props.el}
        </Link>
      </li>
    );
  }
}

export default OpdrachtPerLinkRegel;
