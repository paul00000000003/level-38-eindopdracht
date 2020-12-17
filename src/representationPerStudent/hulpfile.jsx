import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MaakHistogram from "./MakeHistogram";
import StudentPerLinkRegel from "./StudentPerLinkRegel";
import "./weergaveperstudent.css";
import MaakLineChart from "./MaakLineChart";

let studenten = [];
let data = [];
let opdrachten = [];
let outputselectie = [];
let gekozenStudenten = [];

const sorteerStudenten = (studenten) =>
  studenten.sort(function (a, b) {
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
  studenten = [];
  opdrachten = [];
  scores.forEach((element) => {
    if (!studenten.includes(element.student)) studenten.push(element.student);
    if (!opdrachten.includes(element.opdracht))
      opdrachten.push(element.opdracht);
  });
  return [studenten, opdrachten];
};

const make_lineChart_data = (gekozenStudenten, opdrachten, scores) => {
  let moeilijkGradesOpdr1 = [];
  let moeilijkGradesOpdr2 = [];
  let moeilijkGradesOpdr3 = [];
  let moeilijkGradesOpdr4 = [];
  let moeilijkGradesOpdr5 = [];
  let moeilijkGradesOpdr6 = [];
  let leukGradesOpdr1 = [];
  let leukGradesOpdr2 = [];
  let leukGradesOpdr3 = [];
  let leukGradesOpdr4 = [];
  let leukGradesOpdr5 = [];
  let leukGradesOpdr6 = [];
  scores.forEach((element) => {
    let spotStudent = gekozenStudenten.indexOf(element.student);
    if (spotStudent > -1 && spotStudent < 6) {
      let spotopdracht = opdrachten.indexOf(element.opdracht);
      switch (spotStudent) {
        case 0:
          moeilijkGradesOpdr1[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr1[spotopdracht] = element.leukGrade;
          break;
        case 1:
          moeilijkGradesOpdr2[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr2[spotopdracht] = element.leukGrade;
          break;
        case 2:
          moeilijkGradesOpdr3[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr3[spotopdracht] = element.leukGrade;
          break;
        case 3:
          moeilijkGradesOpdr4[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr4[spotopdracht] = element.leukGrade;
          break;
        case 4:
          moeilijkGradesOpdr5[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr5[spotopdracht] = element.leukGrade;
          break;
        case 5:
          moeilijkGradesOpdr6[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr6[spotopdracht] = element.leukGrade;
          break;
        default:
          console.log("Geen waarde mogelijk voor " + spotStudent);
      }
    }
  });

  let dataLineChart = [];
  opdrachten.forEach((element, index) => {
    dataLineChart.push({
      opdracht: element,
      cijfer1Moeilijk: moeilijkGradesOpdr1[index],
      cijfer2Moeilijk: moeilijkGradesOpdr2[index],
      cijfer3Moeilijk: moeilijkGradesOpdr3[index],
      cijfer4Moeilijk: moeilijkGradesOpdr4[index],
      cijfer5Moeilijk: moeilijkGradesOpdr5[index],
      cijfer6Moeilijk: moeilijkGradesOpdr6[index],
      cijfer1Leuk: leukGradesOpdr1[index],
      cijfer2Leuk: leukGradesOpdr2[index],
      cijfer3Leuk: leukGradesOpdr3[index],
      cijfer4Leuk: leukGradesOpdr4[index],
      cijfer5Leuk: leukGradesOpdr5[index],
      cijfer6Leuk: leukGradesOpdr6[index],
    });
  });

  return dataLineChart;
};

//<MaakHistogram student={this.state.student} scores={this.state.scores}/>:<p></p>}

class WeergavePerStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresHistogram: [],
      scores: [],
      scoreKeuze: "Beide",
      student: "",
      studentGekozen: false,
    };
    this.scoreKeuzeHandle = this.scoreKeuzeHandle.bind(this);
  }

  scoreKeuzeHandle(e) {
    console.log("e target data : ");
    this.setState({ scoreKeuze: e.target.value });
  }

  componentDidMount() {
    let gefilterd = filterScores(this.props.scores);
    studenten = gefilterd[0];
    opdrachten = gefilterd[1];
    this.setState({
      scores: this.props.scores,
      studenten: studenten,
      opdrachten: opdrachten,
    });
  }

  /*
  <div>
  <MaakLineChart
    dataLineChart={this.state.dataLineChart}
    studenten={this.state.gekozenStudenten}
    scorekeuze={this.state.scoreKeuze}
  />
</div>
*/

  render() {
    sorteerStudenten(studenten);
    let studentenLinkRegels = studenten.map((element, index) => {
      let str = "./" + element.toLowerCase();
      return (
        <StudentPerLinkRegel
          str={str}
          el={element}
          key={index}
          handlechange={this.handleChange}
          handlehisto={this.handleHisto}
          index={index}
        />
      );
    });

    let studentenRoutes = studenten.map((element, index) => {
      let str = "/" + element.toLowerCase();
      let student = element;
      return (
        <Route key={index} path={str}>
          <MaakHistogram
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
      <div>
        <div id="bovenruimte"></div>
        <Router>
          <div>
            <div id="hoofdcontainer">
              <div id="entire_side">
                <aside id="aside">
                  <nav>
                    <ul>{studentenLinkRegels}</ul>
                  </nav>
                </aside>
                <p id="labelScorekeuze">Scorekeuze : </p>
                <form>
                  <p className="soortScore">Beide</p>
                  <input
                    className="radio_score"
                    type="radio"
                    name="scorekeuze"
                    value="Beide"
                    onChange={this.scoreKeuzeHandle}
                  />
                  <p className="soortScoreLabel">Moeilijk</p>
                  <input
                    className="radio_score"
                    type="radio"
                    name="scorekeuze"
                    value="Moeilijk"
                    onChange={this.scoreKeuzeHandle}
                  />
                  <p className="soortScoreLabel">Leuk</p>
                  <input
                    className="radio_score"
                    type="radio"
                    name="scorekeuze"
                    value="Leuk"
                    onChange={this.scoreKeuzeHandle}
                  />
                </form>
              </div>
              {this.state.studentGekozen ? (
                <div>
                  <Switch>{studentenRoutes}</Switch>
                </div>
              ) : null}
              )
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default WeergavePerStudent;
