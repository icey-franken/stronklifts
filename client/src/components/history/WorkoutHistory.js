import React from "react";
import ExerciseHistory from "./ExerciseHistory";
import { useDispatch, useSelector } from "react-redux";
// import "./WorkoutHistory.css"; //need to create
import DeleteWorkoutButton from "../utils/DeleteWorkoutButton";

export default function WorkoutHistory({ workoutId }) {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.workouts[workoutId]);
  const { exerciseIds } = workout;
  if (!workout) return null;

  return (
    <div className="workout-history-container">
      <div className="workout-history__date"></div>
      {/* include a workout history exercise component here for each exercise */}
      <div className="workout-history__exercise-container">
        {exerciseIds.map((exerciseId, index) => (
          <ExerciseHistory key={index} exerciseId={exerciseId} />
        ))}
      </div>
      <DeleteWorkoutButton id={workoutId} />
    </div>
  );
}
