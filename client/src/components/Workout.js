import React from "react";
import Exercise from "./Exercise";
import { useDispatch, useSelector } from "react-redux";
import "./Workout.css";

export default function Workout({ workout }) {
  // console.log(workout);
	const exercises = useSelector((state)=>state.exercises);
	const exercisesArr = Object.values(exercises);
	if (!workout) return null;

	const workoutExercisesArr = exercisesArr.filter(exercise=>{
		return (exercise.workoutId === workout.id);
	})

  // let date;
	// const { Exercises, workoutSplit: split } = workout;
  // workout.workoutDate ? (date = workout.workoutDate) : (date = null);
  // let note;
  // if (workout.WorkoutNote) {
  //   const {
  //     WorkoutNote: { description },
  //   } = workout;
  //   note = description;
  // }
	// //do something with workout date and note

	// //making big changes to store - in a bit we'll be able to pull exercises from store based on workoutId - all we have to pass to exercise component will be the workout id
  // let exerciseArr = [];
  // if (Exercises.length > 0) {
  //   //create an exercise component for each exercise in a workout
  //   for (let i = 0; i < Exercises.length; i++) {
  //     const {
  //       ExerciseName: { exerciseName },
  //       WorkingWeight: { weight },
  //       // numRepsGoal,
  //       numSets,
  //       Sets,
  //     } = Exercises[i];
  //     exerciseArr.push([
  //       exerciseName.toUpperCase(),
  //       weight,
  //       Sets,
  //       numSets,
  //       split,
  //     ]); //can also push numRepsGoal, BUT THIS IS A 5X5 APP. We only push numSets for the case of deadlift, where there is only 1 set
  //   }
  // }

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
        {workoutExercisesArr.map((exercise, index) => {
          return <Exercise key={index} exercise={exercise} />;
        })}
      </div>
      <div className="workout__note">Notes: {note}</div>
    </div>
  );
}
