import React from "react";
import WorkoutHistory from "../components/history/WorkoutHistory";
import { useSelector } from "react-redux";
import './WorkoutHistory.css'

export default function WorkoutHistoryPage() {
  const workouts = useSelector((state) => state.workouts);

  const workoutIds = Object.keys(workouts);

	if (workouts === undefined) return null;
	workoutIds.reverse();

  return (
    <div>
        <div className='workout-history-container'>
          <h1 className='workout-history__header'>Workout History</h1>
          <div className="workout-history__workouts-container">
            {workoutIds.map((workoutId, index) => {
              return <WorkoutHistory key={index} workout={workouts[workoutId]} workoutId={workoutId} />;
            })}
          </div>
        </div>
    </div>
  );
}
