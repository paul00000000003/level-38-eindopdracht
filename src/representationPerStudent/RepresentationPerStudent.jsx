import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MakeHistogram from "./MakeHistogram";
import StudentPerLinkRegel from "./StudentPerLinkRegel";
import "./representationPerStudent.css";
import MaakLineChart from "./MaakLineChart";

let students = [];
let data = [];
let assignments = [];
let outputselectie = [];
let gekozenStudents = [];

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

const filterScores = (scores) => {
  students = [];
  assignments = [];
  scores.forEach((element) => {
    if (!students.includes(element.student)) students.push(element.student);
    if (!assignments.includes(element.assignment))
      assignments.push(element.assignment);
  });
  return [students, assignments];
};

const make_lineChart_data = (gekozenStudents, assignments, scores) => {
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
  console.log(
    "scores " +
      scores.length +
      " " +
      gekozenStudents.length +
      " " +
      assignments.length
  );
  scores.forEach((element) => {
    let spotStudent = gekozenStudents.indexOf(element.student);
    if (spotStudent > -1 && spotStudent < 6) {
      let spotopdracht = assignments.indexOf(element.assignment);
      switch (spotStudent) {
        case 0:
          difficultGradesAssign1[spotopdracht] = element.difficultGrade;
          niceGradesAssign1[spotopdracht] = element.niceGrade;
          break;
        case 1:
          difficultGradesAssign2[spotopdracht] = element.difficultGrade;
          niceGradesAssign2[spotopdracht] = element.niceGrade;
          break;
        case 2:
          difficultGradesAssign3[spotopdracht] = element.difficultGrade;
          niceGradesAssign3[spotopdracht] = element.niceGrade;
          break;
        case 3:
          difficultGradesAssign4[spotopdracht] = element.difficultGrade;
          niceGradesAssign4[spotopdracht] = element.niceGrade;
          break;
        case 4:
          difficultGradesAssign5[spotopdracht] = element.difficultGrade;
          niceGradesAssign5[spotopdracht] = element.niceGrade;
          break;
        case 5:
          difficultGradesAssign6[spotopdracht] = element.difficultGrade;
          niceGradesAssign6[spotopdracht] = element.niceGrade;
          break;
        default:
          console.log("Geen waarde mogelijk voor " + spotStudent);
      }
    }
  });

  let dataLineChart = [];
  assignments.forEach((element, index) => {
    dataLineChart.push({
      assignment: element,
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

class RepresentationPerStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresHistogram: [],
      scores: [],
      scoreKeuze: "Beide",
      student: "",
      makeHistogram: false,
      gekozenStudents: [],
    };
    this.scoreKeuzeHandle = this.scoreKeuzeHandle.bind(this);
    this.makegraph = this.makegraph.bind(this);
  }

  scoreKeuzeHandle(e) {
    this.setState({ scoreKeuze: e.target.value, makeHistogram: true });
  }

  makegraph(index, link, student) {
    let linkjes = Array.from(document.getElementsByClassName("linkklas"));
    linkjes.forEach((element) => {
      if (element.classList.contains("maakbold"))
        element.classList.remove("maakbold");
    });
    outputselectie = Array.from(document.getElementsByClassName("outputoptie"));
    outputselectie.forEach((element) => (element.checked = false));
    link.classList.add("maakbold");
    gekozenStudents = [student];
    data = make_lineChart_data(
      gekozenStudents,
      this.state.assignments,
      this.props.scores
    );
    this.setState({
      makegraph: true,
      student,
      dataLineChart: data,
      gekozenStudents,
    });
  }

  componentDidMount() {
    let gefilterd = filterScores(this.props.scores);
    students = gefilterd[0];
    assignments = gefilterd[1];
    this.setState({
      scores: this.props.scores,
      students: students,
      assignments,
    });
  }

  render() {
    sortStudents(students);
    let studentsLinkRegels = students.map((element, index) => {
      let str = "./" + element.toLowerCase();
      return (
        <StudentPerLinkRegel
          str={str}
          el={element}
          key={index}
          handlechange={this.handleChange}
          makegraph={this.makegraph}
          index={index}
        />
      );
    });

    let studentsRoutes = students.map((element, index) => {
      let str = "/" + element.toLowerCase();
      let student = element;
      return (
        <Route key={index} path={str}>
          <MakeHistogram
            key={index}
            student={student}
            scoreKeuze={this.state.scoreKeuze}
            scoresHistogram={this.props.scores.filter(
              (element) => element.student === student
            )}
          />
        </Route>
      );
    });

    return (
      <Router>
        <div id="bovenruimte"></div>
        <div id="maincontainer">
          <div id="aside">
            <nav id="nav">
              <ul>{studentsLinkRegels}</ul>
            </nav>
            <div>
              <p className="soortScore">Scorekeuze : </p>
              <div className="soortScore">
                <p className="soortScoreLabel">Beiden</p>
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
          </div>
          <hr />
          {this.state.makegraph ? (
            <div id="graphcontainer">
              <Switch className="switch">{studentsRoutes}</Switch>
              <div>
                <MaakLineChart
                  dataLineChart={this.state.dataLineChart}
                  students={this.state.gekozenStudents}
                  scorekeuze={this.state.scoreKeuze}
                />
              </div>
            </div>
          ) : (
            <div>
              <img
                className="verschuifPlaatje_enkel"
                src="https://www.mupload.nl/img/0npaaxw.gif"
                alt="student"
                width="300px"
              />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default RepresentationPerStudent;
