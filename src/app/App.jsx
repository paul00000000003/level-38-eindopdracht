import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../home/Home";
import RepresentationPerStudent from "../representation-per-student/representationPerStudent";
import RepresentationPerAssignmentMaster from "../representation-per-assignment/representationPerAssignmentMaster";
import RepresentationMultipleStudents from "../representation-multiple-students/representationMultipleStudents";
import RepresentationMultipleAssignments from "../representation-multiple-assignments/representationMultipleAssignments";
import "./App.css";

/*
async function scoresFetch(scores) {
  try {
    const response = await 
    const scoresData = await response.text();
    await console.log(scoresData);
    const scoreLines = scoresData.split("\n");
    console.log("aantal scores : " + scoreLines.length);
    scoreLines.forEach((score) => {
      const scoreData = score.split(",");
      scores.push({
        student: scoreData[0],
        assignment: scoreData[1],
        difficultGrade: scoreData[2],
        niceGrade: scoreData[3],
      });
    });
  } catch (err) {
    console.log(err);
  }
}
*/

let scores = [];

class App extends Component {
  constructor() {
    super();
    this.state = { scores: [], schermGeladen: false };
  }

  componentDidMount() {
    fetch("/scoresData/scoreSourceData.txt")
      .then((response) => response.text())
      .then((scoresData) => {
        const scoreLines = scoresData.split("\n");
        scoreLines.forEach((score) => {
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
        });
        this.setState({ scores, schermGeladen: true });
      });
  }

  render() {
    if (this.state.schermGeladen) {
      return (
        <Router>
          <nav>
            <h1 id="hoofdtitel">
              <p id="titel_woord1">R e s u l t a t e n</p>
              <p className="titel_spatiering"> </p>
              <p id="titel_woord2">L e u k</p>
              <p className="titel_spatiering"></p>
              <p id="titel_woord3">e n</p>
              <p className="titel_spatiering"></p>
              <p id="titel_woord4">M o e i l i j k</p>
            </h1>
            <div>
              <ul className="scoremogelijkheden">
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
