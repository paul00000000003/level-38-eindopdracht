import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./representationPerStudent.css";

class MaakHistogram extends React.Component {
  constructor() {
    super();
    this.state = { scoreKeuze: "", maakHistogram: false };
  }

  render() {
    let barChartKolommenKeuze = [];
    switch (this.props.scoreKeuze) {
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
        <h1 className="centreerNaamEnkelHistogram">{this.props.student}</h1>
        <BarChart width={730} height={250} data={this.props.scoresHistogram}>
          <XAxis dataKey="assignment" />
          <YAxis />
          <Tooltip />
          {barChartKolommenKeuze}
        </BarChart>
      </div>
    );
  }
}

export default MaakHistogram;
