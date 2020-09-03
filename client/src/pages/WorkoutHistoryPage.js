import React from 'react';
import Workout from "../components/Workout";
import { useDispatch, useSelector } from "react-redux";
import {getWorkoutsThunk} from '../store/workouts';
import {useEffect} from 'react';


export default function WorkoutHistoryPage () {
	const workouts = useSelector((state) => state.workouts);
	const userId = useSelector((state) => state.auth.id);
	//loads user workouts on initial page load
	//moved to app.js - moved back here because error on heroku on initial page load
	// const dispatch = useDispatch();
	// useEffect(()=>{
	// 	dispatch(getWorkoutsThunk(userId));
	// }, [dispatch, userId]);

	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getWorkoutsThunk(userId));
	},[]);//dispatch, userId



	if(!Object.keys(workouts)) return null;//chnage this to some "looks like you haven't done a damn thing" page
	//.reverse method works for now - may have to fix in future.
	const workoutsArr = Object.values(workouts).reverse();


//need to make new components for workout history - for now they're the same.
//for a single workout view component, you should be able to click (either on whole thing or specific spot) that will take you to the Active workout page but load that workout (based on id) and allow you to edit. Kind of hacky but it'll work.
  return (
    <>
      <h1>this is your workout history page</h1>
      {workoutsArr.map((workout, index) => {
				return <Workout key={index} workout={workout} />;
      })}
    </>
  );
}
