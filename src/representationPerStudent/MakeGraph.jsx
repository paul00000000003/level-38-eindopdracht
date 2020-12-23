import React from "react";
import MakeBarchart from "./MakeBarchart";
import MakeLinechart from "./MakeLinechart";
import "./representationPerStudent.css";

class MakeGraph extends React.Component {
  constructor() {
    super();
    this.state = { scoreChoice: "" };
  }

  render() {
    return (
      <div>
        <h1 className="centreerNaamEnkelHistogram">{this.props.student}</h1>
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
