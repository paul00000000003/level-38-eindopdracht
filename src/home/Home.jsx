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

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresGemiddeld: [],
      schermGeladen: false,
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
    assignments.sort(function (a, b) {
      let element1 = a;
      let element2 = b;
      if (element1 < element2) {
        return -1;
      }
      if (element1 > element2) {
        return 1;
      }
      return 0;
    });

    assignments.forEach((assignment, index) => {
      const assignmentobj = {
        assignment,
        number: 0,
        niceGradeTotal: 0,
        difficultGradeTotal: 0,
      };
      gradesTotals.push(assignmentobj);
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
    gradesTotals.forEach((element) => {
      if (element.niceGradeTotal !== 0 && element.number !== 0)
        niceGradeAvg = element.niceGradeTotal / element.number;
      else niceGradeAvg = 0;
      if (element.difficultGradeTotal !== 0 && element.number !== 0)
        difficultGradeAvg = element.difficultGradeTotal / element.number;
      else difficultGradeAvg = 0;
      scoresAverage.push({
        assignment: element.assignment,
        niceGrade: niceGradeAvg,
        difficultGrade: difficultGradeAvg,
      });
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
            className="outputkeuze"
            name="outputkeuze"
            value={this.state.makeLineChart}
            onChange={this.make_linechart}
          />
          <label>Maak histogram</label>
          <input
            id="histo"
            type="radio"
            className="outputkeuze"
            name="outputkeuze"
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

export default Home;
