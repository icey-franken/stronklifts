import React from "react";
import Exercise from "./Exercise";
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
      exerciseArr.push([exerciseName.toUpperCase(), weight, Sets, numSets]); //can also push numRepsGoal, BUT THIS IS A 5X5 APP. We only push numSets for the case of deadlift, where there is only 1 set
    }
  }
  // console.log(exerciseArr);
  //render an exercise component for each exercise in a workout
  //change dummyDate to date after fixing formatting
  const dummyDate = "Wed, August 2nd 2020";
  return (
    <div className="workout-container">
      {/* fix workout date formatting in database */}
      <div className="workout__info-container">
        <div className="workout__title">5x5 - A Day</div>
        <div className="workout__date">{dummyDate}</div>
      </div>
      <div className="workout__exercises">
        {exerciseArr.map((exercise, index) => {
          return <Exercise key={index} exercise={exercise} />;
        })}
      </div>
      <div className="workout__note">Notes: {note}</div>
    </div>
  );
}
