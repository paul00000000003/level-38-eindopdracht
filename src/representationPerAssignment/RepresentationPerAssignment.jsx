import React, { useState, useEffect } from "react";
import MakeGraph from "./MakeGraph";
import OptionLine from "./OptionLine";
import { Route, useHistory, Switch } from "react-router-dom";
import "./representationPerAssignment.css";

// Styles

function RepresentationPerAssignment(props) {
  let history = useHistory();

  const [makeGraph, setMakeGraph] = useState(false);
  const [scoreChoice, setScoreChoice] = useState("Beide");

  const handleChange2 = (e) => {
    let reference;
    reference = "/" + e.target.value;
    setMakeGraph(true);
    history.push(reference.toLowerCase());
    e.preventDefault();
  };

  const scoreChoiceHandle = (e) => {
    console.log("gedrukt " + e.target.value);
    setScoreChoice(e.target.value);
  };

  let Assignments = [];
  props.scores.forEach((element) => {
    if (Assignments.indexOf(element.assignment) === -1)
      Assignments.push(element.assignment);
  });

  const links = Assignments.map((element, index) => (
    <OptionLine key={index} assignment={element} />
  ));

  useEffect(() => setMakeGraph(false), []);

  const routes = Assignments.map((element, index) => {
    const str = "/" + element.toLowerCase();
    let assignment = element;
    return (
      <Route key={index} path={str}>
        <MakeGraph
          assignment={element}
          scores={props.scores.filter((item) => item.assignment === assignment)}
          scoreChoice={scoreChoice}
        />
      </Route>
    );
  });

  return (
    <div className="singleContainerPerAssignment">
      <form className="formContainer">
        <h1 className="headerAssignments">Opdrachten</h1>
        <select className="selectSingle" onChange={handleChange2}>
          <option value=""></option>
          {links}
        </select>
        <p className="sortScore">Scorekeuze : </p>

        <div className="sortScore">
          <p>Beide</p>
          <input
            className="radio_enkel_pa"
            type="radio"
            name="scorechoice"
            value="Beide"
            onChange={scoreChoiceHandle}
            defaultChecked
          />
        </div>

        <div className="sortScore">
          <p>Moeilijk</p>
          <input
            className="radio_enkel_pa"
            type="radio"
            name="scorechoice"
            value="Moeilijk"
            onChange={scoreChoiceHandle}
          />
        </div>
        <div className="sortScore">
          <p>Leuk</p>
          <input
            className="radio_enkel_pa"
            type="radio"
            name="scorechoice"
            value="Leuk"
            onChange={scoreChoiceHandle}
          />
        </div>
      </form>
      {makeGraph ? (
        <Switch>{routes}</Switch>
      ) : (
        <div>
          <img
            className="verschuifBoek_enkel"
            src="https://www.mupload.nl/img/3gtpo26ut9aj.jpg"
            alt="boek"
            width="400px"
          />
        </div>
      )}
    </div>
  );
}

export default RepresentationPerAssignment;
