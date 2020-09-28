import React from "react";
import WorkoutHistory from "../components/history/WorkoutHistory";
import { useDispatch, useSelector } from "react-redux";
import { workoutThunks } from "../store/workouts";
import { useEffect } from "react";
import './WorkoutHistory.css'
import {useHistory} from 'react-router-dom';

export default function WorkoutHistoryPage() {
  const workouts = useSelector((state) => state.workouts);
  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(workoutThunks.getWorkouts(userId));
  }, [dispatch, userId]);

  const workoutIds = Object.keys(workouts);
	console.log('from workouthistorypage', workoutIds)

	const history = useHistory();
	if (workoutIds.length < 0) return null;
	if(workoutIds.length === 0) history.push('/newLifterForm')
  //.reverse method works for now - may have to fix in future.
	workoutIds.reverse();

  return (
    <div>
        <div className='workout-history-container'>
          <h1 className='workout-history__header'>Workout History</h1>
          <div className="workout-history__workouts-container">
            {workoutIds.map((workoutId, index) => {
              return <WorkoutHistory key={index} workoutId={workoutId} />;
            })}
          </div>
        </div>
    </div>
  );
}
