import React from "react";
import MakeBarChart from "./makeBarChart";
import MakeLineChart from "./makeLineChart";

class MakeGraph extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.assignment}</h1>
        <MakeBarChart
          scores={this.props.scores}
          scoreChoice={this.props.scoreChoice}
        />
        <MakeLineChart
          scores={this.props.scores}
          scoreChoice={this.props.scoreChoice}
        />
      </div>
    );
  }
}

export default MakeGraph;
