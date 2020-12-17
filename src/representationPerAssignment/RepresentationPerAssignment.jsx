import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AssignmentPerLinkLine from "./AssignmentPerLinkLine";
import "./representationPerAssignment.css";
import MakeHistogram from "./MakeHistogram";
import MaakLineChart from "./MaakLineChart";

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
  chosenAssignments = assign;
  let difficultGradesAssign1 = [];
  let difficultGradesAssign2 = [];
  let difficultGradesAssign3 = [];
  let difficultGradesAssign4 = [];
  let difficultGradesAssign5 = [];
  let difficultGradesAssign6 = [];
  let niceGradesAssign1 = [];
  let niceGradesAssign2 = [];
  let niceGradesAssign3 = [];
  let niceGradesAssign4 = [];
  let niceGradesAssign5 = [];
  let niceGradesAssign6 = [];
  console.log("begin : " + chosenAssignments.length + " " + students.length);
  scores.forEach((element) => {
    let spotAssign = chosenAssignments.indexOf(element.assignment);
    if (spotAssign > -1 && spotAssign < 6) {
      console.log("gevondenspotAssign " + spotAssign);
      let spotstudent = students.indexOf(element.student);
      switch (spotAssign) {
        case 0:
          difficultGradesAssign1[spotstudent] = element.difficultGrade;
          niceGradesAssign1[spotstudent] = element.niceGrade;
          break;
        case 1:
          difficultGradesAssign2[spotstudent] = element.difficultGrade;
          niceGradesAssign2[spotstudent] = element.difficultGrade;
          break;
        case 2:
          difficultGradesAssign3[spotstudent] = element.difficultGrade;
          niceGradesAssign3[spotstudent] = element.niceGrade;
          break;
        case 3:
          difficultGradesAssign4[spotstudent] = element.difficultGrade;
          niceGradesAssign4[spotstudent] = element.niceGrade;
          break;
        case 4:
          difficultGradesAssign5[spotstudent] = element.difficultGrade;
          niceGradesAssign5[spotstudent] = element.niceGrade;
          break;
        case 5:
          difficultGradesAssign6[spotstudent] = element.difficultGrade;
          niceGradesAssign6[spotstudent] = element.niceGrade;
          break;
        default:
          console.log("Geen waarde mogelijk voor " + spotAssign);
      }
    }
  });

  let dataLineChart = [];
  sortStudents(students);
  students.forEach((element, index) => {
    console.log(
      "vullen punt 1: " +
        difficultGradesAssign1[index] +
        " " +
        niceGradesAssign1[index]
    );
    dataLineChart.push({
      student: element,
      grade1Difficult: difficultGradesAssign1[index],
      grade2Difficult: difficultGradesAssign2[index],
      grade3Difficult: difficultGradesAssign3[index],
      grade4Difficult: difficultGradesAssign4[index],
      grade5Difficult: difficultGradesAssign5[index],
      grade6Difficult: difficultGradesAssign6[index],
      grade1Nice: niceGradesAssign1[index],
      grade2Nice: niceGradesAssign2[index],
      grade3Nice: niceGradesAssign3[index],
      grade4Nice: niceGradesAssign4[index],
      grade5Nice: niceGradesAssign5[index],
      grade6Nice: niceGradesAssign6[index],
    });
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
            {this.state.makeGraph && (
              <div>
                <Switch>{assignmentRoutes}</Switch>
                <div>
                  <MaakLineChart
                    dataLineChart={this.state.dataLineChart}
                    assignments={this.state.chosenAssignments}
                    scoreChoice={this.state.scoreChoice}
                  />
                </div>
              </div>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default RepresentationPerAssignment;
