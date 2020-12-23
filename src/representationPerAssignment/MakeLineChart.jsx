import React from "react";
import {
  LineChart,
  Legend,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

class MakeLineChart extends React.Component {
  render() {
    let lines;
    switch (this.props.scoreChoice) {
      case "Beide":
        lines = [
          <Line
            key="1"
            name="cijfer moeilijk"
            type="monotone"
            dataKey="difficultGrade"
            stroke="#8884d8"
          />,
          <Line
            key="2"
            name="cijfer leuk"
            type="monotone"
            dataKey="niceGrade"
            stroke="#FF0000"
          />,
        ];
        break;
      case "Leuk":
        lines = [
          <Line
            key="1"
            name="cijfer leuk"
            type="monotone"
            dataKey="niceGrade"
            stroke="#FF0000"
          />,
        ];
        break;
      case "Moeilijk":
        lines = [
          <Line
            key="1"
            name="cijfer moeilijk"
            type="monotone"
            dataKey="difficultGrade"
            stroke="#8884d8"
          />,
        ];
        break;
      default:
        lines = [
          <Line
            key="1"
            name="cijfer moeilijk"
            type="monotone"
            dataKey="difficultGrade"
            stroke="#8884d8"
          />,
          <Line
            key="2"
            name="cijfer leuk"
            type="monotone"
            dataKey="niceGrade"
            stroke="#FF0000"
          />,
        ];
    }

    return (
      <LineChart
        key="3"
        className="lineChart"
        width={730}
        height={250}
        data={this.props.scores}
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
