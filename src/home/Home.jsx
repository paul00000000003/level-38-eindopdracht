import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";

class home extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresAverage: [],
      makeHistogram: true,
      makeLineChart: false,
    };

    this.make_linechart = this.make_linechart.bind(this);
    this.make_histogram = this.make_histogram.bind(this);
  }

  make_linechart() {
    this.setState({ makeHistogram: false });
  }

  make_histogram() {
    this.setState({ makeHistogram: true });
  }

  componentDidMount() {
    let gradesTotals = [];
    let scoresAverage = [];
    let assignments = [];
    let positionAssignment;

    this.props.scores.forEach((element) => {
      if (!assignments.includes(element.assignment))
        assignments.push(element.assignment);
    });
    assignments.sort(function (assignment1, assignment2) {
      if (assignment1 < assignment2) {
        return -1;
      }
      if (assignment1 > assignment2) {
        return 1;
      }
      return 0;
    });

    gradesTotals = assignments.map((assignment) => {
      return {
        assignment,
        number: 0,
        niceGradeTotal: 0,
        difficultGradeTotal: 0,
      };
    });

    this.props.scores.forEach((element) => {
      positionAssignment = assignments.indexOf(element.assignment);
      gradesTotals[positionAssignment]["niceGradeTotal"] += element.niceGrade;
      gradesTotals[positionAssignment]["difficultGradeTotal"] +=
        element.difficultGrade;
      gradesTotals[positionAssignment]["number"] += 1;
    });

    let niceGradeAvg;
    let difficultGradeAvg;
    scoresAverage = gradesTotals.map((total) => {
      if (total.niceGradeTotal !== 0 && total.number !== 0)
        niceGradeAvg = total.niceGradeTotal / total.number;
      else niceGradeAvg = 0;
      if (total.difficultGradeTotal !== 0 && total.number !== 0)
        difficultGradeAvg = total.difficultGradeTotal / total.number;
      else difficultGradeAvg = 0;
      return {
        assignment: total.assignment,
        niceGrade: niceGradeAvg,
        difficultGrade: difficultGradeAvg,
      };
    });
    this.setState({ scoresAverage: scoresAverage, schermGeladen: true });
  }

  render() {
    if (this.state.schermGeladen)
      return (
        <div>
          <h1>Winc gemiddelde resultaten leuk en moeilijk</h1>
          <label>Maak linechart</label>
          <input
            type="radio"
            name="outputChoice"
            value={this.state.makeLineChart}
            onChange={this.make_linechart}
          />
          <label>Maak histogram</label>
          <input
            id="histo"
            type="radio"
            name="outputChoice"
            value={this.state.makeHistogram}
            onChange={this.make_histogram}
            defaultChecked
          />
          <hr />

          {this.state.makeHistogram ? (
            <BarChart width={1600} height={500} data={this.state.scoresAverage}>
              <XAxis dataKey="assignment" />
              <YAxis />
              <Tooltip />
              <Bar name="moeilijk" dataKey="difficultGrade" fill="#FF0000" />
              <Bar name="leuk" dataKey="niceGrade" fill="#008000" />
            </BarChart>
          ) : (
            <LineChart
              className="linechart"
              width={1460}
              height={500}
              data={this.state.scoresAverage}
              margin={{ top: 5 }}
            >
              <XAxis dataKey="assignment" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                name="moeilijk"
                type="monotone"
                dataKey="difficultGrade"
                stroke="#FF0000"
              />
              <Line
                name="leuk"
                type="monotone"
                dataKey="niceGrade"
                stroke="#008000"
              />
            </LineChart>
          )}
        </div>
      );
    else return <h1>Moment geduld alstublieft. Het scherm wordt geladen</h1>;
  }
}

export default home;
