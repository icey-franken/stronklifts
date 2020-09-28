import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workoutThunks } from "../store/workouts";
import { useEffect } from "react";
import WorkoutPage from "./WorkoutPage";

export default function NewWorkoutPageContainer() {
  const [workoutId, setWorkoutId] = useState(null);
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(workoutThunks.createWorkout(userId)).then((res) => {
      setWorkoutId(res);
    });
  }, [dispatch, userId]);
  if (workoutId === null) return null;

  return <WorkoutPage workoutId={workoutId} />;
}
