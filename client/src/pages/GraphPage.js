import React from "react";
import { useSelector } from "react-redux";
import Graph from "../components/Graph/Graph";

export default function GraphPage() {
  const exercises = useSelector((state) => state.exercises);
  const exercisesArr = Object.values(exercises);
  exercisesArr.sort((a, b) => (a.workoutDate > b.workoutDate ? 1 : -1));
  //consider adding a selector to redux store that separates by exercise name.
  //for now I will do it caveman style
  let squatData = [];
  let overheadData = [];
  let deadliftData = [];
  let benchData = [];
  let rowData = [];

  //turn this into an action - put this stuff in the redux store
  //then based on the graph view selected we can grab that set of data and render a graph page quickly.
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

  const workoutData = {
    sq: { exerciseName: "Squat", dataPoints: squatData },
    op: { exerciseName: "Overhead Press", dataPoints: overheadData },
    dl: { exerciseName: "Deadlift", dataPoints: deadliftData },
    bp: { exerciseName: "Bench Press", dataPoints: benchData },
    pr: { exerciseName: "Pendlay Row", dataPoints: rowData },
  };

  return (
    <div className="graph-page-container">
      <Graph workoutData={workoutData} />
    </div>
  );
}
