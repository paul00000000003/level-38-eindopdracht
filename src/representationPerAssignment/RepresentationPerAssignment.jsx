import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AssignmentPerLinkLine from "./AssignmentPerLinkLine";
import "./representationPerAssignment.css";
import MakeHistogram from "./MakeHistogram";
import MakeLineChart from "./MakeLineChart";

let assignments = [];
let students = [];
let outputselection = [];
let data = [];
let chosenAssignments = [];

const sortStudents = (students) =>
  students.sort(function (a, b) {
    let student1 = a;
    let student2 = b;
    if (student1 < student2) {
      return -1;
    }
    if (student1 > student2) {
      return 1;
    }
    return 0;
  });

const make_lineChart_data = (assign, scores) => {
  let chosenAssignments = assign;
  let dataLineChart = [];
  sortStudents(students);
  students.forEach((element) => {
    const item = { student: element };
    dataLineChart.push(item);
  });

  scores.forEach((element) => {
    let spotAssign = chosenAssignments.indexOf(element.assignment);
    if (spotAssign > -1 && spotAssign < 6) {
      let spotstudent = students.indexOf(element.student);
      switch (spotAssign) {
        case 0:
          dataLineChart[spotstudent]["grade1Difficult"] =
            element.difficultGrade;
          dataLineChart[spotstudent]["grade1Nice"] = element.niceGrade;
          break;
        case 1:
          dataLineChart[spotstudent]["grade2Difficult"] =
            element.difficultGrade;
          dataLineChart[spotstudent]["grade2Nice"] = element.niceGrade;
          break;
        case 2:
          dataLineChart[spotstudent]["grade3Difficult"] =
            element.difficultGrade;
          dataLineChart[spotstudent]["grade3Nice"] = element.niceGrade;
          break;
        case 3:
          dataLineChart[spotstudent]["grade4Difficult"] =
            element.difficultGrade;
          dataLineChart[spotstudent]["grade4Nice"] = element.niceGrade;
          break;
        case 4:
          dataLineChart[spotstudent]["grade5Difficult"] =
            element.difficultGrade;
          dataLineChart[spotstudent]["grade5Nice"] = element.niceGrade;
          break;
        case 5:
          dataLineChart[spotstudent]["grade6Difficult"] =
            element.difficultGrade;
          dataLineChart[spotstudent]["grade6Nice"] = element.niceGrade;
          break;
        default:
          console.log("onverwacht");
      }
    }
  });
  return dataLineChart;
};

const makeListAssignments = (scores) => {
  scores.forEach((element) => {
    if (!assignments.includes(element.assignment))
      assignments.push(element.assignment);
    if (!students.includes(element.student)) students.push(element.student);
  });
  return [assignments, students];
};

class RepresentationPerAssignment extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenAssignments: [],
      students: [],
      dataLineChart: [],
      assignments: [],
      scoreChoice: "Beide",
      scores: [],
      makeLineChart: false,
      makeHistogram: false,
      makeGraph: false,
    };
    this.scoreKeuzeHandle = this.scoreKeuzeHandle.bind(this);
    this.handleHisto = this.handleHisto.bind(this);
  }

  scoreKeuzeHandle(e) {
    this.setState({ scoreChoice: e.target.value });
  }

  handleHisto(index, link, assignment) {
    let links = Array.from(document.getElementsByClassName("linkklas"));
    links.forEach((element) => {
      if (element.classList.contains("maakbold"))
        element.classList.remove("maakbold");
    });
    outputselection = Array.from(
      document.getElementsByClassName("outputoptie")
    );
    outputselection.forEach((element) => (element.checked = false));
    link.classList.add("maakbold");
    chosenAssignments = [assignment];
    data = make_lineChart_data(chosenAssignments, this.props.scores);
    this.setState({ makeGraph: true, chosenAssignments, dataLineChart: data });
  }

  componentDidMount() {
    let makeList = makeListAssignments(this.props.scores);
    assignments = makeList[0];
    students = makeList[1];
    this.setState({
      assignments,
      students,
      scores: this.props.scores,
    });
  }

  render() {
    let assignmentLinks = assignments.map((element, index) => {
      let str = "./" + element.toLowerCase();
      return (
        <AssignmentPerLinkLine
          str={str}
          el={element}
          key={index}
          handlechange={this.handleChange}
          handlehisto={this.handleHisto}
          index={index}
        />
      );
    });

    let assignmentRoutes = assignments.map((element, index) => {
      let str = "/" + element.toLowerCase();
      let assignment = element;
      return (
        <Route key={index} path={str}>
          <MakeHistogram
            assignment={assignment}
            scoreChoice={this.state.scoreChoice}
            scoresHistogram={this.props.scores.filter(
              (element) => element.assignment === assignment
            )}
          />
        </Route>
      );
    });

    return (
      <div>
        <Router>
          <div id="hoofdcontainer">
            <ul className="ul_per_assignment">{assignmentLinks}</ul>
            <div>
              <p className="soortscore">Scorekeuze : </p>
              <div className="soortScore">
                <p className="soortScoreLabel">Beide</p>
                <input
                  className="radioScore"
                  type="radio"
                  name="scorekeuze"
                  value="Beide"
                  onChange={this.scoreKeuzeHandle}
                  defaultChecked
                />
              </div>
              <div className="soortScore">
                <p className="soortScoreLabel">Moeilijkheid</p>
                <input
                  className="radioScore"
                  type="radio"
                  name="scorekeuze"
                  value="Moeilijk"
                  onChange={this.scoreKeuzeHandle}
                />
              </div>
              <div className="soortScore">
                <p className="soortScoreLabel">Leuk</p>
                <input
                  className="radioScore"
                  type="radio"
                  name="scorekeuze"
                  value="Leuk"
                  onChange={this.scoreKeuzeHandle}
                />
              </div>
            </div>
            {this.state.makeGraph ? (
              <div>
                <Switch>{assignmentRoutes}</Switch>
                <div>
                  <MakeLineChart
                    dataLineChart={this.state.dataLineChart}
                    assignments={this.state.chosenAssignments}
                    scoreChoice={this.state.scoreChoice}
                  />
                </div>
              </div>
            ) : (
              <div>
                <img
                  className="verschuifBoek_enkel"
                  src="https://www.mupload.nl/img/3gtpo26ut9aj.jpg"
                  alt="boek"
                  width="600px"
                />
              </div>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default RepresentationPerAssignment;
