import scoresSourceData from "./scoresSourceFile";

let scores = [];

scoresSourceData.forEach((score) =>
  scores.push({
    student: score[0],
    assignment: score[1],
    difficultGrade: score[2],
    niceGrade: score[3],
  })
);

export default scores;
