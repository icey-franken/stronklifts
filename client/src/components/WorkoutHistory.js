import React from 'react';
// import ExerciseHistory from "./ExerciseHistory";
import { useDispatch, useSelector } from "react-redux";
import "./WorkoutHistory.css";
import DeleteWorkoutButton from './DeleteWorkoutButton'

export default function WorkoutHistory({workoutId}) {
	const dispatch = useDispatch();
  const workout = useSelector((state) => state.workouts[workoutId]);
  if (!workout) return null;

	return (
		<div className='workout-history-container'>
			<div className='workout-history__date'></div>
			{/* include a workout history exercise component here for each exercise */}

			{/* this is  the same delete button from the workout.js component - make component for modularity */}
			<DeleteWorkoutButton id={workoutId}/>


		</div>
	)
}
