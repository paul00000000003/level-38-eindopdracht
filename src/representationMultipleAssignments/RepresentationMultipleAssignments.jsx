import React from "react";
import AssignmentsPerLine from "./AssignmentsPerLine";
import "./representationMultipleAssignments.css";
import MaakLineChart from "./MaakLineChart";

let assignments = [];
let students = [];

let outputselection = [];
let data = [];

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

  console.log("gekozen opdrachten " + chosenAssignments[0]);
  console.log("studenten : " + students.length);

  scores.forEach((element) => {
    let spotAssign = chosenAssignments.indexOf(element.assignment);
    console.log("plek opdracht : " + spotAssign);
    if (spotAssign > -1 && spotAssign < 6) {
      let spotstudent = students.indexOf(element.student);
      console.log("spot " + spotAssign + " " + spotstudent);
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
      "vullen " + difficultGradesAssign1[index] + " " + niceGradesAssign1[index]
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

class RepresentationMultipleAssignments extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenAssignments: [],
      students: [],
      dataLineChart: [],
      assignments: [],
      scoreChoice: "Leuk",
      scores: [],
      makeLineChart: false,
      makeHistogram: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.scoreChoiceHandle = this.scoreChoiceHandle.bind(this);
  }

  handleChange(index, vinkje) {
    let chosenAssignments = this.state.chosenAssignments;
    console.log("binnen handlechange");
    if (vinkje.checked === true) {
      if (chosenAssignments.length === 6) {
        alert("Er kunnen slechts 6 opdrachten worden gekozen");
        vinkje.checked = false;
      } else {
        if (
          this.state.scoreChoice === "Beide" &&
          chosenAssignments.length === 1
        ) {
          vinkje.checked = false;
          alert(
            "Bij twee of meer opdrachten kun je voor de scorekeuze alleen moeilijk of leuk kiezen"
          );
        } else {
          chosenAssignments.push(this.state.assignments[index]);
        }
      }
    } else {
      let index2 = -1;

      chosenAssignments.forEach((element, index3) => {
        if (element === this.state.assignments[index]) index2 = index3;
      });
      if (index2 !== -1) chosenAssignments.splice(index2, 1);
    }

    outputselection = Array.from(
      document.getElementsByClassName("outputoptie")
    );
    outputselection.forEach((element) => (element.checked = false));
    if (chosenAssignments.length === 0)
      this.setState({
        chosenAssignments,
        makeLineChart: false,
        dataLineChart: [],
      });
    else {
      data = make_lineChart_data(chosenAssignments, this.props.scores);
      data.forEach((element) =>
        console.log(element.grade1Difficult + "  " + element.grade1Nice)
      );
      this.setState({
        makeLineChart: true,
        dataLineChart: data,
        chosenAssignments,
      });
    }
  }

  scoreChoiceHandle(e) {
    this.setState({ scoreChoice: e.target.value });
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
    const assignmentLinks = assignments.map((element, index) => {
      return (
        <AssignmentsPerLine
          key={index}
          element={element}
          handlechange={this.handleChange}
          index={index}
        />
      );
    });
    return (
      <div>
        <div className="heading">
          <p className="sortScoreLabel">Moeilijk</p>
          <input
            className="radio_score"
            type="radio"
            name="scorechoice"
            value="Moeilijk"
            onChange={this.scoreChoiceHandle}
          />
          <p className="sortScoreLabel">Leuk</p>
          <input
            className="radio_score"
            type="radio"
            name="scorechoice"
            value="Leuk"
            onChange={this.scoreChoiceHandle}
            defaultChecked
          />
          <h1 className="headingMultipleAssignments">
            Kies een of meerdere opdrachten
          </h1>
        </div>
        <div className="displayContainers">
          <div className="multipleAssignmentLines">{assignmentLinks}</div>
          {this.state.makeLineChart && (
            <div>
              <MaakLineChart
                dataLineChart={this.state.dataLineChart}
                assignments={this.state.chosenAssignments}
                scorechoice={this.state.scoreChoice}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RepresentationMultipleAssignments;
