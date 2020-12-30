import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../home/Home";
import RepresentationPerStudent from "../representation-per-student/representationPerStudent";
import RepresentationPerAssignmentMaster from "../representation-per-assignment/representationPerAssignmentMaster";
import RepresentationMultipleStudents from "../representation-multiple-students/representationMultipleStudents";
import RepresentationMultipleAssignments from "../representation-multiple-assignments/representationMultipleAssignments";
import "./App.css";

let scores = [];

const addScore = (score) => {
  const scoreData = score.split(",");
  if (scoreData.length === 4) {
    const student = scoreData[0].replaceAll('"', "");
    const assignment = scoreData[1].replaceAll('"', "");
    scores.push({
      student,
      assignment,
      difficultGrade: parseInt(scoreData[2].trim()),
      niceGrade: parseInt(scoreData[3].trim()),
    });
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = { scores: [], dataLoaded: false };
  }

  componentDidMount() {
    fetch("/scoresData/scoreSourceData.txt")
      .then((response) => response.text())
      .then((scoresData) => {
        const scoreLines = scoresData.split("\n");
        scoreLines.forEach((score) => addScore(score));
        this.setState({ scores, dataLoaded: true });
      });
  }

  render() {
    if (this.state.dataLoaded) {
      return (
        <Router>
          <nav>
            <h1 id="mainTitle">
              <p id="title_word1">R e s u l t a t e n</p>
              <p className="title_spacing"> </p>
              <p id="title_word2">L e u k</p>
              <p className="title_spacing"></p>
              <p id="title_word3">e n</p>
              <p className="title_spacing"></p>
              <p id="title_word4">M o e i l i j k</p>
            </h1>
            <div>
              <ul className="scorePossibilities">
                <li className="li-nav">
                  <Link className="link nav-link" to="./">
                    Home
                  </Link>
                </li>
                <li className="li-nav">
                  {" "}
                  <Link className="link" to={"./representation-per-student"}>
                    Per student
                  </Link>
                </li>
                <li className="li-nav">
                  <Link
                    className="link"
                    to={"./representation-multiple-students"}
                  >
                    Meerdere studenten
                  </Link>
                </li>
                <li className="li-nav">
                  {" "}
                  <Link className="link" to={"./representation-per-assignment"}>
                    Per opdracht
                  </Link>
                </li>
                <li className="li-nav">
                  <Link
                    className="link"
                    to={"./representation-multiple-assignments"}
                  >
                    Meerdere opdrachten
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home scores={this.state.scores} />
            </Route>
            <Route path="/representation-per-student">
              <RepresentationPerStudent scores={this.state.scores} />
            </Route>
            <Route path="/representation-multiple-students">
              <RepresentationMultipleStudents scores={this.state.scores} />
            </Route>
            <Route path="/representation-per-assignment">
              <RepresentationPerAssignmentMaster scores={this.state.scores} />
            </Route>
            <Route path="/representation-multiple-assignments">
              <RepresentationMultipleAssignments scores={this.state.scores} />
            </Route>
          </Switch>
        </Router>
      );
    } else return <h1>Moment geduld. Gegevens worden geladen</h1>;
  }
}

export default App;
