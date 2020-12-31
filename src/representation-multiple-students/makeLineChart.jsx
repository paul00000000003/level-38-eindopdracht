import React from "react";
import "./representationMultipleStudents.css";
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
  state = { scoreChoice: "Nice" };

  handleScoreChoice = () => {
    if (this.state.scoreChoice === "Nice")
      this.setState({ scoreChoice: "Difficult" });
    else this.setState({ scoreChoice: "Nice" });
  };

  render() {
    let color = "#8400D3";
    let dataKey = "cijfer1Leuk";
    let name_label;
    let lines = [];
    console.log(
      "aantal data line chart start: " + this.props.dataLineChart.length
    );
    this.props.dataLineChart.forEach((score) =>
      console.log(score.assignment, " ", score.grade1Nice)
    );
    if (this.state.scoreChoice === "Nice") {
      lines = this.props.students.map((element, index) => {
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
            color = "#FF0000"; //paars
            dataKey = "grade1Nice";
        }
        name_label = "cijfer leuk student " + element;
        return (
          <Line
            name={name_label}
            type="monotone"
            dataKey={dataKey}
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
            color = "#8400D3"; //paars
            dataKey = "grade4Difficult";
            break;
          case 4:
            color = "#FFA500"; //oranje
            dataKey = "grade5Difficult";
            break;
          case 5:
            color = "#A65E2E"; //bruin
            dataKey = "grade6Difficult";
            break;
          default:
            color = "#FF0000"; //paars
            dataKey = "grade1Difficult";
        }
        name_label = "cijfer moeilijk student " + element;
        return (
          <Line
            name={name_label}
            type="monotone"
            dataKey={dataKey}
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
            onChange={this.handleScoreChoice}
          />
          <p>Leuk</p>
          <input
            className="radio"
            type="radio"
            name="scoreChoice"
            value="Leuk"
            onChange={this.handleScoreChoice}
            defaultChecked
          />
        </form>
        <hr />
        <LineChart
          className="lineChart"
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
