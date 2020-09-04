import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateReps} from '../store/sets';
import "./Set.css";

export default function Set({ setId }) {

	const set = useSelector((state)=>state.sets[setId]);
	const dispatch = useDispatch();
  const handleClick = (e) => {
    if (e.target.innerHTML > 0) e.target.innerHTML--;
    else if (e.target.innerHTML === "0") {
			e.target.innerHTML = null;
			e.target.classList.add('exercise__set--emptySet');
		} else {
			e.target.innerHTML = '5';
			e.target.classList.remove('exercise__set--emptySet')
		}
		//this updates store - we should set something up that updates the value in the database after a certain amount of dead time. (debouncing?)
		dispatch(updateReps(setId, e.target.innerHTML));
			// else if (e.target.innerHTML === "")
  };
  return (
    <div className="exercise__set-container">
      {(set.numRepsActual === null)? (
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
