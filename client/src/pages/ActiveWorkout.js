import React from "react";
import Workout from "../components/Workout";
import { useDispatch, useSelector } from "react-redux";
import {createWorkoutThunk} from '../store/workouts';
import {useEffect} from 'react';

export default function ActiveWorkout({workoutId=null}) {
	//the idea with the default prop is that if they just click workout, it should make a new workout by default. If they are on the home page and click on a workout, we should send the workoutId over so that this page loads the correct workout and allows them to edit it.

	const workouts = useSelector((state) => state.workouts);
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.id);
// 	//most recent workout is workouts[0] - we can check if it is completed. If so, create a new workout based on workoutSplit property.
// 	let workout = workouts[0];
// console.log(workout);
// 	// if(workout.workoutComplete === true) {
// 		// work
// 		//dispatch a thunk to create a new workout,
// 	// }

	// //this should actually create a new workout
	// useEffect(()=>{
	// 	//need to get previous working weights for exercises that pertain to the split.
	// 	//we could define a workingWeight slice of state that has the working weight for each exercise, along with number of failures.
	// 	//pass in an exerciseInfo array of objects with:
	// 	//exerciseName (from exerciseNameId), workingWeight (from workingWeightId), wasSuccessful, numFails,
	// 	//we can save this in a slice of state called progress?
	// 	//in the thunk we can figure out the workoutDate to submit. Based on workoutSplit, a post request will be made to db. Have default values in db take care of as much as possible.

	// 	dispatch(createWorkoutThunk(userId, workoutSplit, progress));
	// }, [dispatch, userId]);

	console.log(Object.keys(workouts));
	if(!Object.keys(workouts)) return null;//chnage this to some "looks like you haven't done a damn thing" page
	console.log(workouts);
  return (
    <>
      <h1>Welcome to the active workout page</h1>
      {/* {workouts.map((workout, index) => {
				return <Workout key={index} workout={workout} />;
      })} */}
    </>
  );
}
