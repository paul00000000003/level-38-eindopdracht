import React from "react";
import AssignmentsPerLine from "./AssignmentsPerLine";
import "./representationMultipleAssignments.css";
import MakeLineChart from "./MakeLineChart";

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
          {this.state.makeLineChart ? (
            <div>
              <MakeLineChart
                dataLineChart={this.state.dataLineChart}
                assignments={this.state.chosenAssignments}
                scorechoice={this.state.scoreChoice}
              />
            </div>
          ) : (
            <div>
              <img
                className="shift_multipleBooks"
                src="https://www.mupload.nl/img/3gtpo26ut9aj.jpg"
                alt="boek"
                width="300px"
              />
              <img
                className="shift_multipleBooks2"
                src="https://www.mupload.nl/img/3gtpo26ut9aj.jpg"
                alt="boek"
                width="300px"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RepresentationMultipleAssignments;
