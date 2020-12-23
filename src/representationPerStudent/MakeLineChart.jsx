import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";

class MakeLinechart extends React.Component {
  render() {
    let color = "#8400D3";
    let dataKey = "cijfer1Leuk";
    let name = "";
    if (this.props.scoreChoice === "Beide") {
      return (
        <div>
          <LineChart
            className="linechart"
            width={730}
            height={250}
            data={this.props.scoresGraph}
            margin={{ top: 5 }}
          >
            <XAxis dataKey="assignment" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              name="cijfer moeilijk"
              type="monotone"
              dataKey="difficultGrade"
              stroke="#8884d8"
            />
            <Line
              name="cijfer leuk"
              type="monotone"
              dataKey="niceGrade"
              stroke="#FF0000"
            />
          </LineChart>
        </div>
      );
    } else {
      if (this.props.scoreChoice === "Leuk") {
        color = "#8884d8";
        dataKey = "niceGrade";
        name = "cijfer leuk student " + this.props.student;
      } else {
        color = "#FF0000"; //rood
        dataKey = "difficultGrade";
        name = "cijfer moeilijk student " + this.props.student;
      }
      return (
        <div>
          <LineChart
            className="linechart"
            width={730}
            height={250}
            data={this.props.scoresGraph}
            margin={{ top: 5 }}
          >
            <XAxis dataKey="assignment" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              name={name}
              type="monotone"
              dataKey={dataKey}
              stroke={color}
            />
          </LineChart>
        </div>
      );
    }
  }
}

export default MakeLinechart;
