import React from "react";
import { useSelector } from "react-redux";
import Graph from "../components/Graph";

export default function GraphPage() {
  const exercises = useSelector((state) => state.exercises);
	const exercisesArr = Object.values(exercises);
	exercisesArr.sort((a,b)=>(a.workoutDate> b.workoutDate) ? 1 : -1)
  //consider adding a selector to redux store that separates by exercise name.
  //for now I will do it caveman style
  let squatData = ['Squat'];
  let overheadData = ['Overhead Press'];
  let deadliftData = ['Deadlift'];
	let benchData = ['Bench Press'];
  let rowData = ['Pendlay Row'];
  exercisesArr.forEach(({ exerciseName, workingWeight, workoutDate }) => {
    if (exerciseName === "Squat") {
      squatData.push([workoutDate, workingWeight]);
    } else if (exerciseName === "Overhead Press") {
      overheadData.push([workoutDate, workingWeight]);
    } else if (exerciseName === "Deadlift") {
      deadliftData.push([workoutDate, workingWeight]);
    } else if (exerciseName === "Bench Press") {
      benchData.push([workoutDate, workingWeight]);
    } else if (exerciseName === "Pendlay Row") {
      rowData.push([workoutDate, workingWeight]);
    }
	});
	//just squat data for now to simplify progress on graph component
  let graphData = [squatData]//, overheadData, deadliftData, benchData, rowData];
  return (
    <>
      <div>hi from graph page</div>
			{graphData.map((dataPoints, index)=><Graph key={index} dataPoints={dataPoints}/>)}
    </>
  );
}
