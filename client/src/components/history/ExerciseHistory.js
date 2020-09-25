import React from "react";
import { useSelector } from "react-redux";
import SetHistory from "./SetHistory";
import SetEmptyHistory from "./SetEmptyHistory";

export default function ExerciseHistory({ exerciseId }) {
  const exercise = useSelector((state) => state.exercises[exerciseId]);
  const { setIds } = exercise;
  console.log(setIds);
  return (
    <div className="workout-history__exercise-container">
      <div className="workout-history__exercise-info">
        <div className="workout-history__exercise-name">
          {exercise.exerciseName}
        </div>
        <div className="workout-history__exercise-weight">
          {exercise.workingWeight} lbs
        </div>
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
