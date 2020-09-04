import React from "react";
import Exercise from "./Exercise";
import { useDispatch, useSelector } from "react-redux";
import "./Workout.css";

export default function Workout({ workoutId }) {
	// console.log(workout);
	const workout = useSelector(state=> state.workouts[workoutId])
	if (!workout) return null;

  //date formatting
  const dateFormat = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
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

	let note = 'need to make note slice of state'
  return (
    <div className="workout-container">
      {/* fix workout date formatting in database */}
      <div className="workout__info-container">
        <div className="workout__title">{workout.workoutSplit} Day</div>
        <div className="workout__date">{dateStr}</div>
      </div>
      <div className="workout__exercises">
        {workout.exerciseIds.map((exerciseId, index) => {
          return <Exercise key={index} exerciseId={exerciseId} />;
        })}
      </div>
      <div className="workout__note">Notes: {note}</div>
    </div>
  );
}
