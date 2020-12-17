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

class MaakLineChart extends React.Component {
  render() {
    let color = "#8400D3";
    let datakey = "grade1Nice";
    console.log("binnen maak line chart");

    let lines = [];
    if (this.props.scorechoice === "Leuk") {
      lines = this.props.assignments.map((element, index) => {
        switch (index) {
          case 0:
            color = "#FF0000"; //rood
            datakey = "grade1Nice";
            break;
          case 1:
            color = "#7FFFD4"; //aquamarijn
            datakey = "grade2Nice";
            break;
          case 2:
            color = "#008000"; //groen
            datakey = "grade3Nice";
            break;
          case 3:
            color = "#8400D3"; //paars
            datakey = "grade4Nice";
            break;
          case 4:
            color = "#FFA500"; //oranje
            datakey = "grade5Nice";
            break;
          case 5:
            color = "#A65E2E"; //bruin
            datakey = "grade6Nice";
            break;
          default:
            color = "#FF0000"; //roond
            datakey = "grade1Nice";
        }
        let name = "cijfer leuk opdracht " + element;
        return (
          <Line name={name} type="monotone" dataKey={datakey} stroke={color} />
        );
      });
    } else {
      lines = this.props.assignments.map((element, index) => {
        switch (index) {
          case 0:
            color = "#FF0000"; //rood
            datakey = "grade1Difficult";
            break;
          case 1:
            color = "#7FFFD4"; //aquamarijn
            datakey = "grade2Difficult";
            break;
          case 2:
            color = "#008000"; //groen
            datakey = "grade3Difficult";
            break;
          case 3:
            color = "#8400D3"; //aquamarijn
            datakey = "grade4Difficult";
            break;
          case 4:
            color = "#FFA500"; //groen
            datakey = "grade5Difficult";
            break;
          case 5:
            color = "#A65E2E"; //bruin
            datakey = "grade6Difficult";
            break;
          default:
            color = "#8400D3"; //paars
            datakey = "grade1Difficult";
        }
        let name = "cijfer moeilijk opdracht " + element;
        return (
          <Line name={name} type="monotone" dataKey={datakey} stroke={color} />
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

export default MaakLineChart;
