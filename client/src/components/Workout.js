import React from "react";
import Exercise from "./Exercise";
import { Grid } from "@material-ui/core";
import "./Workout.css";

export default function Workout({ workout }) {
  // console.log(workout);
  const { workoutDate: date, Exercises } = workout;
  let note;
  if (workout.WorkoutNote) {
    const {
      WorkoutNote: { description },
    } = workout;
    note = description;
  }
  //do something with workout date and note
  let exerciseArr = [];
  if (Exercises.length > 0) {
    //create an exercise component for each exercise in a workout
    for (let i = 0; i < Exercises.length; i++) {
      const {
        ExerciseName: { exerciseName },
        WorkingWeight: { weight },
        // numRepsGoal,
        numSets,
        Sets,
      } = Exercises[i];
      exerciseArr.push([exerciseName, weight, Sets, numSets]);//can also push numRepsGoal, BUT THIS IS A 5X5 APP. We only push numSets for the case of deadlift, where there is only 1 set
    }
  }
  // console.log(exerciseArr);
  //render an exercise component for each exercise in a workout
  return (
    <>
      <h1>I am a single workout component</h1>
          <div>Workout Date: {date}</div>
					{/* <div className='exercise-view-container'> add class here (around exercise component) or in exercise component*/}
          {exerciseArr.map((exercise, index) => {
            return (
							<Exercise key={index} exercise={exercise} />
            );
          })}
        <div>Workout Note: {note}</div>
    </>
  );
}
