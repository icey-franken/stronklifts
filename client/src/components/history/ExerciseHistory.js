import React from "react";
import { useSelector } from "react-redux";
import SetHistory from "./SetHistory";
import SetEmptyHistory from "./SetEmptyHistory";

export default function ExerciseHistory({ exerciseId }) {
  const exercise = useSelector((state) => state.exercises[exerciseId]);
  const { setIds } = exercise;
	console.log(setIds);
	let exerciseFail = '';
	if(!exercise.wasSuccessful) exerciseFail='fail';
	let exerciseDeload = '';
	if(exercise.didDeload) exerciseDeload='deload';
  return (
    <div className="workout-history__exercise-container">
      <div className="workout-history__exercise-info">
        {/* {exercise.exerciseName} ({exercise.workingWeight} lbs)  */}
        <span className={exerciseFail}>{exercise.exerciseName}&nbsp;</span>
        <span className="workout-history__exercise-weight-container">(<span className={exerciseDeload}>{exercise.workingWeight} lbs</span>)</span>
        {/* <div className="workout-history__exercise-success">
          {exercise.wasSuccessful ? "" : "[FAIL]"}&nbsp;
        </div> */}
        {/* <div className="workout-history__exercise-deload">
          {exercise.didDeload ? "[DELOAD]" : ""}&nbsp;
        </div> */}
      </div>
      <div className="workout-history__sets-container">
        {setIds.map((setId, index) =>
          setId === "emptySet" ? (
            <SetEmptyHistory key={index} />
          ) : (
            <SetHistory key={index} setId={setId} />
          )
        )}
      </div>
    </div>
  );
}
