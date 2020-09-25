import React from "react";
import ExerciseHistory from "./ExerciseHistory";
import { useDispatch, useSelector } from "react-redux";
// import "./WorkoutHistory.css"; //need to create
import DeleteWorkoutButton from "../utils/DeleteWorkoutButton";
import './history.css'

export default function WorkoutHistory({ workoutId }) {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.workouts[workoutId]);
  const { exerciseIds } = workout;
  if (!workout) return null;
  // import date formatter
  return (
    <div className="workout-history-container">
      <div className="workout-history__date">{workout.workoutDate}</div>
      <div className="workout-history__exercises-container">
        {exerciseIds.map((exerciseId, index) => (
          <ExerciseHistory key={index} exerciseId={exerciseId} />
        ))}
      </div>
      {/* include another button for editing workout */}
      <DeleteWorkoutButton id={workoutId} />
    </div>
  );
}
