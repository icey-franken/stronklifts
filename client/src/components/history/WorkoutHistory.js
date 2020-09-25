import React from "react";
import ExerciseHistory from "./ExerciseHistory";
import { useDispatch, useSelector } from "react-redux";
// import "./WorkoutHistory.css"; //need to create
import DeleteWorkoutButton from "../utils/DeleteWorkoutButton";
// import "./history.css";

export default function WorkoutHistory({ workoutId }) {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.workouts[workoutId]);
  const { exerciseIds } = workout;
  if (!workout) return null;
	// import date formatter - for now we copy

	//date formatting
  const dateFormat = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  let dateArr;
  if (workout.workoutDate === null) {
    dateArr = dateFormat.formatToParts(Date.now());
  } else {
    dateArr = dateFormat.formatToParts(new Date(workout.workoutDate));
  }
  let dateStr = "";
  dateArr.forEach((el) => (dateStr += el.value));
	//date string day number is behind by 1 - what the fuck?

  return (
    <div className="workout-history__workout-container">
      <div className="workout-history__workout-info">
        <div className="workout-history__date">{dateStr}</div>
				<div className='workout-history__split'>{workout.workoutSplit} Day</div>
      </div>
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
