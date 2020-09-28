import React, { useState } from "react";
import Workout from "../components/activeWorkout/Workout";
import { useDispatch } from "react-redux";
import { workoutThunks } from "../store/workouts";
import { useHistory } from "react-router-dom";
import AuthSubmitButton from "../components/auth/AuthSubmitButton";
import "./WorkoutPage.css";

export default function WorkoutPage({ workoutId }) {
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    setComplete(true);
    dispatch(workoutThunks.updateWorkoutComplete(workoutId, true));
		//this should send everything to the database
		history.push("/history");
  };

  // if (complete) {
  //   history.push("/history");
  // }

  return (
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
  );
}
