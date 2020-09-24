import React, { useState } from "react";
import Workout from "../components/Workout";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkoutThunk,
  updateWorkoutCompleteThunk,
} from "../store/workouts";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import WorkoutHistoryPage from "./WorkoutHistoryPage";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
import "./ActiveWorkout.css";

export default function ActiveWorkoutPage() {
  const [complete, setComplete] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  // const workouts = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  useEffect(() => {
    dispatch(createWorkoutThunk(userId)).then((res) => {
      setWorkoutId(res);
    });
  }, [dispatch, userId]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateWorkoutCompleteThunk(workoutId, true));
    setComplete(true);
    //this should send everything to the database
  };

  if (workoutId === null) return null;

	return (
    <>
      {complete ? (
        <Redirect to="/history">
          <WorkoutHistoryPage />
        </Redirect>
      ) : (
        <div className="active-workout__container">
          <h1>Time to get Stronk</h1>
          <Workout workoutId={workoutId} />
          <AuthSubmitButton
            className="active-workout__complete-button"
            onClick={handleClick}
          >
            WORKOUT COMPLETE
          </AuthSubmitButton>
        </div>
      )}
    </>
  );
}
