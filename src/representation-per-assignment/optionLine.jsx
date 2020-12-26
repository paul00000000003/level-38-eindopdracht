import React from "react";

class OptionLine extends React.Component {
  render() {
    return (
      <option value={this.props.assignment}>{this.props.assignment}</option>
    );
  }
}

export default OptionLine;
