import React, { useState } from "react";
import Workout from "../components/Workout";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkoutThunk,
  saveWorkoutThunk,
  updateWorkoutCompleteThunk,
} from "../store/workouts";
import { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import WorkoutHistoryPage from "../pages/WorkoutHistoryPage";

export default function ActiveWorkout() {
  const [complete, setComplete] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  const workouts = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  useEffect(() => {
    dispatch(createWorkoutThunk(userId)).then((res) => {
      setWorkoutId(res);
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateWorkoutCompleteThunk(workoutId, true));
    setComplete(true);
    //this should send everything to the database
  };

  if (workoutId === null) return null;
  const workout = workouts[workoutId];
  return (
    <>
      {complete ? (
        <Redirect to="/">
          <WorkoutHistoryPage />
        </Redirect>
      ) : (
        <>
          <h1>Welcome to the active workout page</h1>
          <Workout workoutId={workoutId} />
          <button type="submit" onClick={handleClick}>
            WORKOUT COMPLETE
          </button>
        </>
      )}
    </>
  );
}
