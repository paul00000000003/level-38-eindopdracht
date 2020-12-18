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
    let datakey = "cijfer1Leuk";

    if (this.props.scorekeuze === "Beide") {
      return (
        <div>
          <LineChart
            className="linechart"
            width={730}
            height={250}
            data={this.props.dataLineChart}
            margin={{ top: 5 }}
          >
            <XAxis dataKey="opdracht" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              name="cijfer moeilijk"
              type="monotone"
              dataKey="grade1Difficult"
              stroke="#8884d8"
            />
            <Line
              name="cijfer leuk"
              type="monotone"
              dataKey="grade1Nice"
              stroke="#FF0000"
            />
          </LineChart>
        </div>
      );
    } else {
      let lines = [];
      if (this.props.scorekeuze === "Leuk") {
        lines = this.props.students.map((element, index) => {
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
              color = "#FF0000"; //paars
              datakey = "grade1Nice";
          }
          let name = "cijfer leuk student " + element;
          return (
            <Line
              name={name}
              type="monotone"
              dataKey={datakey}
              stroke={color}
            />
          );
        });
      } else {
        lines = this.props.students.map((element, index) => {
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
              color = "#8400D3"; //paars
              datakey = "grade4Difficult";
              break;
            case 4:
              color = "#FFA500"; //oranje
              datakey = "grade5Difficult";
              break;
            case 5:
              color = "#A65E2E"; //bruin
              datakey = "grade6Difficult";
              break;
            default:
              color = "#FF0000"; //paars
              datakey = "grade1Difficult";
          }
          let name = "cijfer moeilijk student " + element;
          return (
            <Line
              name={name}
              type="monotone"
              dataKey={datakey}
              stroke={color}
            />
          );
        });
      }
      return (
        <LineChart
          className="linechart"
          width={730}
          height={300}
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
}

export default MakeLineChart;
