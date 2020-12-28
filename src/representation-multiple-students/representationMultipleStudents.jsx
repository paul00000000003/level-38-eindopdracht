import React from "react";
import StudentLine from "./studentLine";
import "./representationMultipleStudents.css";
import MakeLineChart from "./makeLineChart";

let students = [];
let data = [];
let assignments = [];
let outputselection = [];
let chosenStudents = [];

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

const filterScores = (scores) => {
  students = [];
  assignments = [];
  scores.forEach((score) => {
    if (!students.includes(score.student)) students.push(score.student);
    if (!assignments.includes(score.assignment))
      assignments.push(score.assignment);
  });
  return [students, assignments];
};

const make_lineChart_data = (chosenStudents, assignments, scores) => {
  let dataLineChart = [];
  assignments.forEach((element) => {
    const item = { assignment: element };
    dataLineChart.push(item);
  });

  scores.forEach((score) => {
    let spotStudent = chosenStudents.indexOf(score.student);
    if (spotStudent > -1 && spotStudent < 6) {
      let spotAssignment = assignments.indexOf(score.assignment);
      switch (spotStudent) {
        case 0:
          dataLineChart[spotAssignment]["grade1Difficult"] =
            score.difficultGrade;
          dataLineChart[spotAssignment]["grade1Nice"] = score.niceGrade;
          break;
        case 1:
          dataLineChart[spotAssignment]["grade2Difficult"] =
            score.difficultGrade;
          dataLineChart[spotAssignment]["grade2Nice"] = score.niceGrade;
          break;
        case 2:
          dataLineChart[spotAssignment]["grade3Difficult"] =
            score.difficultGrade;
          dataLineChart[spotAssignment]["grade3Nice"] = score.niceGrade;
          break;
        case 3:
          dataLineChart[spotAssignment]["grade4Difficult"] =
            score.difficultGrade;
          dataLineChart[spotAssignment]["grade4Nice"] = score.niceGrade;
          break;
        case 4:
          dataLineChart[spotAssignment]["grade5Difficult"] =
            score.difficultGrade;
          dataLineChart[spotAssignment]["grade5Nice"] = score.niceGrade;
          break;
        case 5:
          dataLineChart[spotAssignment]["grade6Difficult"] =
            score.difficultGrade;
          dataLineChart[spotAssignment]["grade6Nice"] = score.niceGrade;
          break;
        default:
          console.log("onverwacht");
      }
    }
  });
  return dataLineChart;
};

class RepresentationMultipleStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresHistogram: [],
      scores: [],
      scoreChoice: "Nice",
      student: "",
      makeHistogram: false,
      lineChartOk: false,
      chosenStudents: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, dash) {
    chosenStudents = this.state.chosenStudents;
    if (dash.checked === true) {
      if (chosenStudents.length === 6) {
        alert("Er kunnen slechts 6 studenten worden gekozen");
        dash.checked = false;
      } else chosenStudents.push(this.state.students[index]);
    } else {
      let index2 = -1;
      chosenStudents.forEach((student, index3) => {
        if (student === this.state.students[index]) index2 = index3;
      });
      if (index2 !== -1) chosenStudents.splice(index2, 1);
    }
    outputselection = Array.from(
      document.getElementsByClassName("outputoption")
    );
    outputselection.forEach((element) => (element.checked = false));
    if (chosenStudents.length === 0)
      this.setState({
        chosenStudents: chosenStudents,
        linechartOk: false,
        dataLineChart: [],
      });
    else {
      data = make_lineChart_data(
        chosenStudents,
        this.state.assignments,
        this.props.scores
      );
      this.setState({
        chosenStudents,
        lineChartOk: true,
        dataLineChart: data,
      });
    }
  }

  componentDidMount() {
    let filtered = filterScores(this.props.scores);
    students = filtered[0];
    assignments = filtered[1];
    this.setState({
      scores: this.props.scores,
      students,
      assignments,
    });
  }

  render() {
    sortStudents(students);
    let studentsLinkLines = students.map((student, index) => {
      return (
        <StudentLine
          name={student}
          key={index}
          handleChange={this.handleChange}
          index={index}
        />
      );
    });
    return (
      <div>
        <h1 className="title">Kies een of meerdere studenten</h1>
        <nav>
          <ul id="ulListMS">{studentsLinkLines}</ul>
        </nav>
        {this.state.chosenStudents.length > 0 ? (
          <MakeLineChart
            dataLineChart={this.state.dataLineChart}
            students={this.state.chosenStudents}
            scorechoice={this.state.scoreChoice}
          />
        ) : (
          <div>
            <img
              id="shiftPictureMultiple"
              src="https://www.mupload.nl/img/0npaaxw.gif"
              alt="studenten"
              width="300px"
            />
            <img
              id="shiftPictureMultiple"
              src="https://www.mupload.nl/img/0npaaxw.gif"
              alt="studenten"
              width="300px"
            />
          </div>
        )}
      </div>
    );
  }
}

export default RepresentationMultipleStudents;
