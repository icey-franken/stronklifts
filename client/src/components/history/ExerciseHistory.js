import React from "react";
import { useSelector } from "react-redux";
import SetHistory from "./SetHistory";

export default function ExerciseHistory({ exerciseId }) {
  const exercise = useSelector((state) => state.exercises[exerciseId]);
  const { setIds } = exercise;
  return (
    <div className="workout-history__exercise">
      <div className="workout-history__sets-container">
        {setIds.map((setId, index) => (
          <SetHistory key={index} setId={setId} />
        ))}
      </div>
    </div>
  );
}
