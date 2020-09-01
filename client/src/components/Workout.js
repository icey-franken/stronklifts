import React from "react";

export default function Workout({ workout }) {
  console.log(workout);
  const { workoutDate: date, Exercises } = workout;
	let note;
  if (workout.WorkoutNote) {
    const {
      WorkoutNote: {description} ,
		} = workout;
		note = description;
	}
	let name;
	if(Exercises.length > 0) {
		//create an exercise component for each exercise in a workout
		for(let i = 0; i < Exercises.length; i ++) {
			const {
				ExerciseName: { exerciseName },
				WorkingWeight: {weight},
				numRepsGoal,
				numSets
			} = Exercises[i];
		}
	}
	console.log(date, note, name, Exercises);
  debugger;
  return <h1>I am a single workout component</h1>;
}
