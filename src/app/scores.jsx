async function scoresFetch(scores) {
  try {
    const response = await fetch("/data/scoreSourceData.txt");
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

let scores = [];
scoresFetch(scores);
setTimeout(() => console.log("voor export : " + scores.length), 1000);
export default scores;
