import React from "react";
import Workout from "../components/Workout";
import { useDispatch, useSelector } from "react-redux";
import {getWorkoutsThunk} from '../store/workouts';
import {useEffect} from 'react';

export default function ActiveWorkout() {
	const workouts = useSelector((state) => state.workouts);
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.id);

	//loads user workouts on initial page load
	useEffect(()=>{
		dispatch(getWorkoutsThunk(userId));
	}, [dispatch, userId]);

	if(!workouts.keys) return null;//chnage this to some "looks like you haven't done a damn thing" page
	console.log(workouts);
  return (
    <>
      <h1>Welcome to the active workout page</h1>
      {workouts.map((workout, index) => {
				return <Workout key={index} workout={workout} />;
      })}
    </>
  );
}
