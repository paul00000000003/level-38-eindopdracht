import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./representationPerStudent.css";

class MakeBarchart extends React.Component {
  constructor() {
    super();
    this.state = { scoreChoice: "" };
  }

  render() {
    let barChartKolommenKeuze = [];
    console.log("keuze score : " + this.props.scoreChoice);
    switch (this.props.scoreChoice) {
      case "Beide":
        barChartKolommenKeuze = [
          <Bar
            name="Cijfers moeilijk"
            dataKey="difficultGrade"
            fill="#8884d8"
          />,
          <Bar name="Cijfers leuk" dataKey="niceGrade" fill="#98FF98" />,
        ];
        break;
      case "Moeilijk":
        barChartKolommenKeuze = [
          <Bar
            name="Cijfers moeilijk"
            dataKey="difficultGrade"
            fill="#8884d8"
          />,
        ];
        break;
      case "Leuk":
        barChartKolommenKeuze = [
          <Bar name="Cijfers leuk" dataKey="niceGrade" fill="#98FF98" />,
        ];
        break;
      default:
        barChartKolommenKeuze = [];
    }
    return (
      <div>
        <BarChart width={730} height={250} data={this.props.scoresGraph}>
          <XAxis dataKey="assignment" />
          <YAxis />
          <Tooltip />
          {barChartKolommenKeuze}
        </BarChart>
      </div>
    );
  }
}

export default MakeBarchart;
