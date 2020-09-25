import React from "react";
import WorkoutHistory from "../components/history/WorkoutHistory";
import { useDispatch, useSelector } from "react-redux";
import { workoutThunks } from "../store/workouts";
import { useEffect } from "react";
import NewLifterForm from "../components/NewLifterForm";
import './WorkoutHistory.css'

export default function WorkoutHistoryPage() {
  const workouts = useSelector((state) => state.workouts);
  const userId = useSelector((state) => state.auth.id);
  //loads user workouts on initial page load
  //moved to app.js - moved back here because error on heroku on initial page load
  // const dispatch = useDispatch();
  // useEffect(()=>{
  // 	dispatch(getWorkoutsThunk(userId));
  // }, [dispatch, userId]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(workoutThunks.getWorkouts(userId));
  }, [dispatch, userId]); //dispatch, userId

  const workoutIds = Object.keys(workouts);

  if (!Object.keys(workouts)) return null; //chnage this to some "looks like you haven't done a damn thing" page
  const handleClick = (e) => {
    //idea is that if they click on a workout from the home page we send them to the active workout page, which serves as our "edit" page for now.
    // if (e.target.id) {
    //   return (
    //     <Redirect
    //       to="/workout"
    //       render={(e.target.id) => <Workout workoutId={e.target.id} />}
    //     />
    //   );
    // }
  };

  //.reverse method works for now - may have to fix in future.

  workoutIds.reverse();
  if (workoutIds.length < 0) return null;
  //need to make new components for workout history - for now they're the same.
  //for a single workout view component, you should be able to click (either on whole thing or specific spot) that will take you to the Active workout page but load that workout (based on id) and allow you to edit. Kind of hacky but it'll work.
  return (
    <div onClick={handleClick}>
      {workoutIds.length !== 0 ? (
        <div className='workout-history-container'>
          <h1 className='workout-history__header'>Workout History</h1>
          <div className="workout-history__workouts-container">
            {workoutIds.map((workoutId, index) => {
              return <WorkoutHistory key={index} workoutId={workoutId} />;
            })}
          </div>
        </div>
      ) : (
        // ideally this would be a modal for those without workouts - don't have time.
        <NewLifterForm userId={userId} />
      )}
    </div>
  );
}
