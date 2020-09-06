import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRepsThunk } from "../store/sets";
import { updateExerciseSuccessThunk } from "../store/exercises";
import "./Set.css";

export default function Set({ setId }) {
  const set = useSelector((state) => state.sets[setId]);
  const sets = useSelector((state) => state.sets);
  const exerciseId = set.exerciseId;
  const setIds = useSelector((state) => state.exercises[exerciseId].setIds);
  const numRepsGoal = useSelector(
    (state) => state.exercises[exerciseId].numRepsGoal
  );
  const numSets = useSelector((state) => state.exercises[exerciseId].numSets);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    let num = e.target.innerHTML;
    if (num === "") {
      num = "5";
      e.target.classList.remove("exercise__set--emptySet");
			set.numRepsActual = 5;
      const successfulSets = setIds.filter((setId) => {
        if (setId === "emptySet") return false;
        return 5 === sets[setId].numRepsActual;
        // return numRepsActual === numRepsGoal;
      });
      if (successfulSets.length === numSets) {
        dispatch(updateExerciseSuccessThunk(exerciseId, true));
      }
    } else if (num === 5) {
      num--;
      dispatch(updateExerciseSuccessThunk(exerciseId, false));
    } else if (num > 0) {
      num--;
    } else if (num === "0") {
      e.target.classList.add("exercise__set--emptySet");
      num = null;
    }
    dispatch(updateRepsThunk(setId, num));
    //this updates store - we should set something up that updates the value in the database after a certain amount of dead time. (debouncing?)
  };

  return (
    <div className="exercise__set-container">
      {set.numRepsActual === null ? (
        <div
          className="exercise__set exercise__set--emptySet"
          onClick={handleClick}
        ></div>
      ) : set.numRepsActual !== "noSet" ? (
        <div className="exercise__set" onClick={handleClick}>
          {set.numRepsActual}
        </div>
      ) : (
        <div className="exercise__set exercise__set--noSet">&#10006;</div>
      )}
    </div>
  );
}
