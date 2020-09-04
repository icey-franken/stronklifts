import React,{useState} from "react";
import Workout from "../components/Workout";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutThunk, saveWorkoutThunk } from "../store/workouts";
import { useEffect, useRef } from "react";

export default function ActiveWorkout() {
	const [workoutId, setWorkoutId] = useState(null)
  const workouts = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
	useEffect(() => {
    dispatch(createWorkoutThunk(userId)).then((res) => {
			setWorkoutId(res);
    });
	}, []);

	const handleClick = (e) =>{
		e.preventDefault();
		dispatch(saveWorkoutThunk(workoutId, workouts[workoutId]));
		//this should send everything to the database
	}

	const workout = workouts[workoutId];
	if(workoutId === null) return null;
  return (
    <>
      <h1>Welcome to the active workout page</h1>
      {/* {workouts.map((workout, index) => {
				return <Workout key={index} workout={workout} />;
      })} */}
			<Workout workout={workout}/>
			<button type='submit' onClick={handleClick}>SAVE</button>
    </>
  );
}
