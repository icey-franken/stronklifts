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
  const dispatch = useDispatch();


  const handleClick = (e) => {
		let num;
		let success = null;
		(e.target.innerHTML === '') ? (num = '') : (num = parseInt(e.target.innerHTML,10));

    if (num === "") {
			set.numRepsActual = 5;
      num = 5;
			e.target.classList.remove("exercise__set--emptySet");
			//we need this because use selector lags behind
      const successfulSets = setIds.filter((setId) => {
        if (setId === "emptySet") return true;
        return 5 === sets[setId].numRepsActual;
			});
      if (successfulSets.length === 5) {
				success = true;
        // dispatch(updateExerciseSuccessThunk(exerciseId, true));
      }
    } else if (num === 5) {
			num--;
			success = false;
      // dispatch(updateExerciseSuccessThunk(exerciseId, false));
    } else if (num > 0) {
      num--;
    } else if (num === 0) {
      num = null;
      e.target.classList.add("exercise__set--emptySet");
    }
		//this updates store - we should set something up that updates the value in the database after a certain amount of dead time. (debouncing?)
		dispatch(updateRepsThunk(setId, num));

		if(success!==null) {
			dispatch(updateExerciseSuccessThunk(exerciseId, success));
		}
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
