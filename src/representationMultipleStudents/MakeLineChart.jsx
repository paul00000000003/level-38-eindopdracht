import React from "react";
import "./makeLinechart.css";

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
        let name = "cijfer leuk student " + element;
        return (
          <Line name={name} type="monotone" dataKey={datakey} stroke={color} />
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
          <Line name={name} type="monotone" dataKey={datakey} stroke={color} />
        );
      });
    }
    return (
      <div>
        <form>
          <p className="sortScore">Soort Score</p>
          <p className="sortScoreLabel">Moeilijk</p>
          <input
            className="radio_score"
            type="radio"
            name="scoreChoice"
            value="Moeilijk"
            onChange={this.scoreKeuzeHandle}
          />
          <p className="soortScoreLabel">Leuk</p>
          <input
            className="radio_score"
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
          <XAxis dataKey="student" />
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
