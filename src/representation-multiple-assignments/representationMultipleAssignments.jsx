import React from "react";
import AssignmentsPerLine from "./assignmentsPerLine";
import "./representationMultipleAssignments.css";
import MakeLineChart from "./makeLineChart";

let assignments = [];
let students = [];
let assignment = "";
let data = [];
let chosenAssignments = [];

const sortStudents = (students) =>
  students.sort(function (student1, student2) {
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
  let dataLineChart = [];
  sortStudents(students);
  dataLineChart = students.map((student) => {
    return {
      student,
    };
  });

  scores.forEach((score) => {
    let spotAssign = chosenAssignments.indexOf(score.assignment);
    if (spotAssign > -1 && spotAssign < 6) {
      let spotStudent = students.findIndex(
        (student) => student.trim() === score.student.trim()
      );
      switch (spotAssign) {
        case 0:
          dataLineChart[spotStudent]["grade1Difficult"] = score.difficultGrade;
          dataLineChart[spotStudent]["grade1Nice"] = score.niceGrade;
          break;
        case 1:
          dataLineChart[spotStudent]["grade2Difficult"] = score.difficultGrade;
          dataLineChart[spotStudent]["grade2Nice"] = score.niceGrade;
          break;
        case 2:
          dataLineChart[spotStudent]["grade3Difficult"] = score.difficultGrade;
          dataLineChart[spotStudent]["grade3Nice"] = score.niceGrade;
          break;
        case 3:
          dataLineChart[spotStudent]["grade4Difficult"] = score.difficultGrade;
          dataLineChart[spotStudent]["grade4Nice"] = score.niceGrade;
          break;
        case 4:
          dataLineChart[spotStudent]["grade5Difficult"] = score.difficultGrade;
          dataLineChart[spotStudent]["grade5Nice"] = score.niceGrade;
          break;
        case 5:
          dataLineChart[spotStudent]["grade6Difficult"] = score.difficultGrade;
          dataLineChart[spotStudent]["grade6Nice"] = score.niceGrade;
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
    if (!students.includes(element.student.trim()))
      students.push(element.student.trim());
  });
  return [assignments, students];
};

class RepresentationMultipleAssignments extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenAssignments: [],
      selectedAssignment: " ",
      students: [],
      dataLineChart: [],
      assignments: [],
      scoreChoice: "Nice",
      scores: [],
      makeLineChart: false,
      makeHistogram: false,
    };

    this.scoreChoiceHandle = this.scoreChoiceHandle.bind(this);
    this.selectAssignment = this.selectAssignment.bind(this);
    this.selectMultipleAdd = this.selectMultipleAdd.bind(this);
    this.selectMultipleRemove = this.selectMultipleRemove.bind(this);
  }

  selectAssignment = (e) => {
    this.setState({ selectedAssignment: e.target.value });
  };

  selectMultipleAdd = (e) => {
    e.preventDefault();
    assignment = this.state.selectedAssignment;
    chosenAssignments = this.state.chosenAssignments;
    if (assignment.trim() !== "") {
      if (chosenAssignments.indexOf(assignment) !== -1)
        document.getElementById("remark").textContent =
          "deze opdracht was al geselecteerd";
      else {
        if (chosenAssignments.length === 6) {
          document.getElementById("remark").textContent =
            "Het maximale aantal te kiezen opdrachten is 6.";
        } else {
          document.getElementById("remark").textContent = "";
          chosenAssignments.push(assignment);
          data = make_lineChart_data(chosenAssignments, this.props.scores);
          this.setState({
            makeLineChart: true,
            dataLineChart: data,
            chosenAssignments,
          });
        }
      }
    }
  };

  selectMultipleRemove = (e) => {
    e.preventDefault();
    assignment = this.state.selectedAssignment;
    chosenAssignments = this.state.chosenAssignments;
    if (assignment.trim() !== "") {
      if (chosenAssignments.indexOf(assignment) === -1)
        document.getElementById("remark").textContent =
          "deze opdracht was niet geselecteerd";
      else {
        document.getElementById("remark").textContent = "";
        let index2 = chosenAssignments.indexOf(assignment);
        if (index2 !== -1) chosenAssignments.splice(index2, 1);
        if (chosenAssignments.length === 0)
          this.setState({
            makeLineChart: false,
            dataLineChart: [],
            chosenAssignments: [],
          });
        else {
          data = make_lineChart_data(chosenAssignments, this.props.scores);
          this.setState({
            makeLineChart: true,
            dataLineChart: data,
            chosenAssignments,
          });
        }
      }
    }
  };

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
          <h1 className="headingMultipleAssignments">
            Kies een of meerdere opdrachten
          </h1>
          <div id="sortScoreSpot">
            <p className="sortScoreLabel">Moeilijk</p>
            <input
              className="radio_score_multass"
              type="radio"
              name="scoreChoice"
              value="Difficult"
              onChange={this.scoreChoiceHandle}
            />
            <p className="sortScoreLabel">Leuk</p>
            <input
              className="radio_score_multass"
              type="radio"
              name="scoreChoice"
              value="Nice"
              onChange={this.scoreChoiceHandle}
              defaultChecked
            />
          </div>
        </div>
        <div className="displayContainers">
          <h1 className="assignmentLabel">Opdrachten : </h1>
          <div id="selectContainer">
            <form className="multipleAssignmentLines">
              <select
                className="multipleAssignmentsSelect"
                onChange={this.selectAssignment}
                value={this.state.selectedAssignment}
              >
                <option value=""></option>
                {assignmentLinks}
              </select>
              <button
                className="selectButtonAdd"
                onClick={this.selectMultipleAdd}
              >
                Toevoegen
              </button>
              <button
                className="selectButtonRemove"
                onClick={this.selectMultipleRemove}
              >
                Verwijderen
              </button>
            </form>
            <p id="remark"></p>
          </div>
          {this.state.makeLineChart ? (
            <div className="positionChart">
              <MakeLineChart
                dataLineChart={this.state.dataLineChart}
                assignments={this.state.chosenAssignments}
                scoreChoice={this.state.scoreChoice}
              />
            </div>
          ) : (
            <div>
              <img
                className="shift_multipleBooks"
                src="https://i.imgur.com/dI6SweJ.gif"
                alt="boek"
                width="300px"
              />
              <img
                className="shift_multipleBooks2"
                src="https://i.imgur.com/dI6SweJ.gif"
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
