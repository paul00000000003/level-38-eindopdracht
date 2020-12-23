import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

class MakeHistogram extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let barChartColumnChoice = [];
    switch (this.props.scoreChoice) {
      case "Beide":
        barChartColumnChoice = [
          <Bar key={1} dataKey="difficultGrade" fill="#8884d8" />,
          <Bar key={2} dataKey="niceGrade" fill="#98FF98" />,
        ];
        break;
      case "Moeilijk":
        barChartColumnChoice = [
          <Bar key={3} dataKey="difficultGrade" fill="#8884d8" />,
        ];
        break;
      case "Leuk":
        barChartColumnChoice = [
          <Bar key={4} dataKey="niceGrade" fill="#98FF98" />,
        ];
        break;
      default:
        barChartColumnChoice = [];
    }
    return (
      <div>
        <h1>{this.props.assignment}</h1>
        <BarChart width={730} height={250} data={this.props.scoresHistogram}>
          <XAxis dataKey="student" />
          <YAxis />
          <Tooltip />
          {barChartColumnChoice}
        </BarChart>
      </div>
    );
  }
}

export default MakeHistogram;
