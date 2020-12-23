import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentPerLinkRegel from "./StudentPerLinkRegel";
import "./representationPerStudent.css";
import MakeGraph from "./MakeGraph";

let students = [];
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

class RepresentationPerStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresHistogram: [],
      scores: [],
      scoreChoice: "Beide",
      student: "",
      makeHistogram: false,
      gekozenStudents: [],
    };
    this.scoreChoiceHandle = this.scoreChoiceHandle.bind(this);
    this.makegraph = this.makegraph.bind(this);
  }

  scoreChoiceHandle(e) {
    this.setState({ scoreChoice: e.target.value, makeHistogram: true });
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
    this.setState({
      makegraph: true,
      student,
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
          <MakeGraph
            key={index}
            student={student}
            scoreChoice={this.state.scoreChoice}
            scoresGraph={this.props.scores.filter(
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
                  name="scorechoice"
                  value="Beide"
                  onChange={this.scoreChoiceHandle}
                  defaultChecked
                />
              </div>
              <div className="soortScore">
                <p className="soortScoreLabel">Moeilijkheid</p>
                <input
                  className="radioScore"
                  type="radio"
                  name="scorechoice"
                  value="Moeilijk"
                  onChange={this.scoreChoiceHandle}
                />
              </div>
              <div className="soortScore">
                <p className="soortScoreLabel">Leuk</p>
                <input
                  className="radioScore"
                  type="radio"
                  name="scorechoice"
                  value="Leuk"
                  onChange={this.scoreChoiceHandle}
                />
              </div>
            </div>
          </div>
          <hr />
          {this.state.makegraph ? (
            <div id="graphcontainer">
              <Switch>{studentsRoutes}</Switch>
            </div>
          ) : (
            <div>
              <img
                className="shiftImage_single"
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
