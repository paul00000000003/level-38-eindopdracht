import React from "react";
import "./makeLineChartMultipleStudents.css";

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
  state = { scorechoice: "Leuk" };

  scoreKeuzeHandle = () => {
    if (this.state.scorechoice === "Leuk")
      this.setState({ scorechoice: "Moeilijk" });
    else this.setState({ scorechoice: "Leuk" });
  };

  render() {
    let color = "#8400D3";
    let datakey = "cijfer1Leuk";
    let name_label;
    let lines = [];
    if (this.state.scorechoice === "Leuk") {
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
            datakey = "grad1Nice";
        }
        name_label = "cijfer leuk student " + element;
        return (
          <Line
            name={name_label}
            type="monotone"
            dataKey={datakey}
            stroke={color}
            key={index}
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
        name_label = "cijfer moeilijk student " + element;
        console.log(name_label);
        return (
          <Line
            name={name_label}
            type="monotone"
            dataKey={datakey}
            stroke={color}
            key={index + 6}
          />
        );
      });
    }
    return (
      <div>
        <form className="sortScoreSelectionMultipleStudents">
          <p>Soort Score Moeilijk</p>
          <input
            className="radio"
            type="radio"
            name="scoreChoice"
            value="Moeilijk"
            onChange={this.scoreKeuzeHandle}
          />
          <p>Leuk</p>
          <input
            className="radio"
            type="radio"
            name="scoreChoice"
            value="Leuk"
            onChange={this.scoreKeuzeHandle}
            defaultChecked
          />
        </form>
        <hr />
        <LineChart
          className="linechart"
          width={1000}
          height={375}
          data={this.props.dataLineChart}
          margin={{ top: 5 }}
        >
          <XAxis dataKey="assignment" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {lines}
        </LineChart>
      </div>
    );
  }
}

export default MakeLineChart;
