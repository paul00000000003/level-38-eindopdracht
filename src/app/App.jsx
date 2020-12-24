import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scores from "./Scores";
import Home from "../home/Home";
import RepresentationPerStudent from "../representationPerStudent/representationPerStudent";
import RepresentationPerAssignmentMaster from "../representationPerAssignment/representationPerAssignmentMaster";
import RepresentationMultipleStudents from "../representationMultipleStudents/representationMultipleStudents";
import RepresentationMultipleAssignments from "../representationMultipleAssignments/representationMultipleAssignments";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { scores: [], schermGeladen: false };
  }

  componentDidMount() {
    this.setState({ scores: Scores, schermGeladen: true });
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
                  <Link className="link" to={"./RepresentationPerStudent"}>
                    Per student
                  </Link>
                </li>
                <li className="li-nav">
                  <Link
                    className="link"
                    to={"./representationMultipleStudents"}
                  >
                    Meerdere studenten
                  </Link>
                </li>
                <li className="li-nav">
                  {" "}
                  <Link className="link" to={"./representationPerAssignment"}>
                    Per opdracht
                  </Link>
                </li>
                <li className="li-nav">
                  <Link
                    className="link"
                    to={"./representationMultipleAssignments"}
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
            <Route path="/RepresentationPerStudent">
              <RepresentationPerStudent scores={this.state.scores} />
            </Route>
            <Route path="/representationMultipleStudents">
              <RepresentationMultipleStudents scores={this.state.scores} />
            </Route>
            <Route path="/representationPerAssignment">
              <RepresentationPerAssignmentMaster scores={this.state.scores} />
            </Route>
            <Route path="/representationMultipleAssignments">
              <RepresentationMultipleAssignments scores={this.state.scores} />
            </Route>
          </Switch>
        </Router>
      );
    } else return <h1>Moment geduld. Gegevens worden geladen</h1>;
  }
}

export default App;
