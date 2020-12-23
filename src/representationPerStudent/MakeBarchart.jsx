import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./representationPerStudent.css";

class MakeBarchart extends React.Component {
  constructor() {
    super();
    this.state = { scoreChoice: "" };
  }

  render() {
    let barChartColumnChoice = [];
    switch (this.props.scoreChoice) {
      case "Beide":
        barChartColumnChoice = [
          <Bar
            name="Cijfers moeilijk"
            dataKey="difficultGrade"
            fill="#8884d8"
          />,
          <Bar name="Cijfers leuk" dataKey="niceGrade" fill="#98FF98" />,
        ];
        break;
      case "Moeilijk":
        barChartColumnChoice = [
          <Bar
            name="Cijfers moeilijk"
            dataKey="difficultGrade"
            fill="#8884d8"
          />,
        ];
        break;
      case "Leuk":
        barChartColumnChoice = [
          <Bar name="Cijfers leuk" dataKey="niceGrade" fill="#98FF98" />,
        ];
        break;
      default:
        barChartColumnChoice = [];
    }
    return (
      <div>
        <BarChart width={730} height={250} data={this.props.scoresGraph}>
          <XAxis dataKey="assignment" />
          <YAxis />
          <Tooltip />
          {barChartColumnChoice}
        </BarChart>
      </div>
    );
  }
}

export default MakeBarchart;
