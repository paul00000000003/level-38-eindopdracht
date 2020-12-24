import React from "react";
import MakeBarchart from "./makeBarchart";
import MakeLinechart from "./makeLineChart";
import "./representationPerStudent.css";

class MakeGraph extends React.Component {
  constructor() {
    super();
    this.state = { scoreChoice: "" };
  }

  render() {
    return (
      <div>
        <h1 className="centerNameSingleSHistogram">{this.props.student}</h1>
        <MakeBarchart
          scoreChoice={this.props.scoreChoice}
          scoresGraph={this.props.scoresGraph}
        />
        <MakeLinechart
          scoreChoice={this.props.scoreChoice}
          scoresGraph={this.props.scoresGraph}
          student={this.props.student}
        />
      </div>
    );
  }
}

export default MakeGraph;
