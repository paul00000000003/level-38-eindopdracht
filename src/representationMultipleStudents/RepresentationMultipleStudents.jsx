import React from "react";
import StudentLine from "./StudentLine";
import "./representationMultipleStudents.css";
import MakeLineChart from "./MakeLineChart";

let students = [];
let data = [];
let assignments = [];
let outputselection = [];
let chosenStudents = [];

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

const make_lineChart_data = (chosenStudents, assignments, scores) => {
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
  scores.forEach((element) => {
    let spotStudent = chosenStudents.indexOf(element.student);
    if (spotStudent > -1 && spotStudent < 6) {
      let spotopdracht = assignments.indexOf(element.assignment);
      switch (spotStudent) {
        case 0:
          difficultGradesAssign1[spotopdracht] = element.difficultGrade;
          niceGradesAssign1[spotopdracht] = element.niceGrade;
          break;
        case 1:
          difficultGradesAssign2[spotopdracht] = element.difficultGrade;
          niceGradesAssign2[spotopdracht] = element.niceGrade;
          break;
        case 2:
          difficultGradesAssign3[spotopdracht] = element.difficultGrade;
          niceGradesAssign3[spotopdracht] = element.niceGrade;
          break;
        case 3:
          difficultGradesAssign4[spotopdracht] = element.difficultGrade;
          niceGradesAssign4[spotopdracht] = element.niceGrade;
          break;
        case 4:
          difficultGradesAssign5[spotopdracht] = element.difficultGrade;
          niceGradesAssign5[spotopdracht] = element.niceGrade;
          break;
        case 5:
          difficultGradesAssign6[spotopdracht] = element.difficultGrade;
          niceGradesAssign6[spotopdracht] = element.niceGrade;
          break;
        default:
          console.log("Geen waarde mogelijk voor " + spotStudent);
      }
    }
  });

  let dataLineChart = [];
  assignments.forEach((element, index) => {
    dataLineChart.push({
      assignment: element,
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

class RepresentationMultipleStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresHistogram: [],
      scores: [],
      scoreChoice: "Leuk",
      student: "",
      makeHistogram: false,
      linechartOk: false,
      chosenStudents: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, vinkje) {
    chosenStudents = this.state.chosenStudents;
    if (vinkje.checked === true) {
      if (chosenStudents.length === 6) {
        alert("Er kunnen slechts 6 studenten worden gekozen");
        vinkje.checked = false;
      } else chosenStudents.push(this.state.students[index]);
    } else {
      let index2 = -1;
      chosenStudents.forEach((element, index3) => {
        if (element === this.state.students[index]) index2 = index3;
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
        linechartOk: true,
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

    let studentenLinkRegels = students.map((element, index) => {
      return (
        <StudentLine
          name={element}
          key={index}
          handlechange={this.handleChange}
          index={index}
        />
      );
    });
    return (
      <div>
        <h1 className="titel">Kies een of meerdere studenten</h1>
        <nav>
          <ul className="ullijstje">{studentenLinkRegels}</ul>
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
              className="verschuifPlaatje_multiple"
              src="https://www.mupload.nl/img/0npaaxw.gif"
              alt="studenten"
              width="300px"
            />
            <img
              className="verschuifPlaatje_multiple"
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
