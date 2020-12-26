import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentPerLinkLine from "./studentPerLinkLine";
import "./representationPerStudent.css";
import MakeGraph from "./makeGraph";

let students = [];
let assignments = [];
let outputSelection = [];

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
    };
    this.scoreChoiceHandle = this.scoreChoiceHandle.bind(this);
    this.makegraph = this.makegraph.bind(this);
  }

  scoreChoiceHandle(e) {
    this.setState({ scoreChoice: e.target.value, makeHistogram: true });
  }

  makegraph(index, link, student) {
    let links = Array.from(document.getElementsByClassName("linkClass"));
    links.forEach((element) => {
      if (element.classList.contains("makebold"))
        element.classList.remove("makebold");
    });
    outputSelection = Array.from(
      document.getElementsByClassName("outputOption")
    );
    outputSelection.forEach((element) => (element.checked = false));
    link.classList.add("makebold");
    this.setState({
      makegraph: true,
      student,
    });
  }

  componentDidMount() {
    let filtered = filterScores(this.props.scores);
    students = filtered[0];
    assignments = filtered[1];
    this.setState({
      scores: this.props.scores,
      students: students,
      assignments,
    });
  }

  render() {
    sortStudents(students);
    let studentsLinkLines = students.map((element, index) => {
      let str = "./" + element.toLowerCase();
      return (
        <StudentPerLinkLine
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
        <div id="upperSpace"></div>
        <div id="mainContainer">
          <div id="aside">
            <nav id="nav">
              <ul>{studentsLinkLines}</ul>
            </nav>
            <div className="containerScoreSS">
              <p className="scoreLineSS">Beiden</p>
              <input
                className="dashScoreSS"
                type="radio"
                name="scoreChoice"
                value="Beide"
                onChange={this.scoreChoiceHandle}
                defaultChecked
              />
            </div>
            <div className="containerScoreSS">
              <p className="scoreLineSS">Moeilijkheid</p>
              <input
                className="dashScoreSS"
                type="radio"
                name="scoreChoice"
                value="Moeilijk"
                onChange={this.scoreChoiceHandle}
              />
            </div>
            <div className="containerScoreSS">
              <p className="scoreLineSS">Leuk</p>
              <input
                className="dashScoreSS"
                type="radio"
                name="scoreChoice"
                value="Leuk"
                onChange={this.scoreChoiceHandle}
              />
            </div>
          </div>
          {this.state.makegraph ? (
            <div id="graphcontainer">
              <Switch>{studentsRoutes}</Switch>
            </div>
          ) : (
            <div>
              <img
                className="shiftImage_singleStudent"
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
