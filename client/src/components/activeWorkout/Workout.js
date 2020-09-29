import React from "react";
import Exercise from "./Exercise";
import { useSelector } from "react-redux";
import "./Workout.css";
import DeleteWorkoutButton from '../utils/DeleteWorkoutButton'
import {longDateFormat} from '../utils/Formatter';

export default function Workout({ workoutId }) {
  const workout = useSelector((state) => state.workouts[workoutId]);
  if (!workout || !workout.exerciseIds) return null;
	const dateStr = longDateFormat(workout.workoutDate);

  return (
    <div className="workout-container">
      {/* fix workout date formatting in database */}
      <div className="workout__info-container">
        <div className="workout__title">{workout.workoutSplit} Day</div>
        <div className="workout__date">{dateStr}</div>
        <DeleteWorkoutButton id={workoutId}/>
      </div>
      <div className="workout__exercises">
        {workout.exerciseIds.map((exerciseId, index) => {
          return <Exercise key={index} exerciseId={exerciseId} />;
        })}
      </div>
      <div className="workout__note">Notes: {workout.note}</div>
    </div>
  );
}
