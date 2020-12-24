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

class MakeLineChart extends React.Component {
  render() {
    let color = "#8400D3";
    let dataKey = "grade1Nice";
    let lines = [];
    if (this.props.scoreChoice === "Leuk") {
      lines = this.props.assignments.map((element, index) => {
        switch (index) {
          case 0:
            color = "#FF0000"; //rood
            dataKey = "grade1Nice";
            break;
          case 1:
            color = "#7FFFD4"; //aquamarijn
            dataKey = "grade2Nice";
            break;
          case 2:
            color = "#008000"; //groen
            dataKey = "grade3Nice";
            break;
          case 3:
            color = "#8400D3"; //paars
            dataKey = "grade4Nice";
            break;
          case 4:
            color = "#FFA500"; //oranje
            dataKey = "grade5Nice";
            break;
          case 5:
            color = "#A65E2E"; //bruin
            dataKey = "grade6Nice";
            break;
          default:
            color = "#FF0000"; //roond
            dataKey = "grade1Nice";
        }
        let name = "cijfer leuk opdracht " + element;
        return (
          <Line
            key={index}
            name={name}
            type="monotone"
            dataKey={dataKey}
            stroke={color}
          />
        );
      });
    } else {
      lines = this.props.assignments.map((element, index) => {
        switch (index) {
          case 0:
            color = "#FF0000"; //rood
            dataKey = "grade1Difficult";
            break;
          case 1:
            color = "#7FFFD4"; //aquamarijn
            dataKey = "grade2Difficult";
            break;
          case 2:
            color = "#008000"; //groen
            dataKey = "grade3Difficult";
            break;
          case 3:
            color = "#8400D3"; //aquamarijn
            dataKey = "grade4Difficult";
            break;
          case 4:
            color = "#FFA500"; //groen
            dataKey = "grade5Difficult";
            break;
          case 5:
            color = "#A65E2E"; //bruin
            dataKey = "grade6Difficult";
            break;
          default:
            color = "#8400D3"; //paars
            dataKey = "grade1Difficult";
        }
        let name = "cijfer moeilijk opdracht " + element;
        return (
          <Line
            key={index}
            name={name}
            type="monotone"
            dataKey={dataKey}
            stroke={color}
          />
        );
      });
    }
    return (
      <LineChart
        className="linechart"
        width={730}
        height={250}
        data={this.props.dataLineChart}
        margin={{ top: 5 }}
      >
        <XAxis dataKey="student" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    );
  }
}

export default MakeLineChart;
