import React from "react";
import Exercise from "./Exercise";
import { Grid } from "@material-ui/core";
import "./Workout.css";

export default function Workout({ workout }) {
  console.log(workout);
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
        numRepsGoal,
        numSets,
        Sets,
      } = Exercises[i];
      exerciseArr.push([exerciseName, weight, numRepsGoal, numSets, Sets]);
    }
  }
  console.log(exerciseArr);
  //render an exercise component for each exercise in a workout
  return (
    <>
      <h1>I am a single workout component</h1>
      <Grid container>
        <Grid item xs={2}>
          <div>Workout Date: {date}</div>
        </Grid>
        <Grid container spacing={10}>
          {exerciseArr.map((exercise, index) => {
            return (
              <Grid container item className="exerciseView">
                <Exercise key={index} exercise={exercise} />
              </Grid>
            );
          })}
        </Grid>
        <div>Workout Note: {note}</div>
      </Grid>
    </>
  );
}
