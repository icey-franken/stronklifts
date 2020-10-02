import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Graph from "../components/Graph/Graph";
import { graphActions } from "../store/graph";

export default function GraphPage() {
  const exercises = useSelector((state) => state.exercises);
  const exercisesArr = Object.values(exercises);
  exercisesArr.sort((a, b) => (a.workoutDate > b.workoutDate ? 1 : -1));

  const dispatch = useDispatch();
  //consider adding a selector to redux store that separates by exercise name.
  //for now I will do it caveman style
  let squatDate = [];
  let squatWeight = [];
  let overheadDate = [];
  let overheadWeight = [];
  let deadliftDate = [];
  let deadliftWeight = [];
  let benchDate = [];
  let benchWeight = [];
  let rowDate = [];
  let rowWeight = [];

  //turn this into an action - put this stuff in the redux store
  //then based on the graph view selected we can grab that set of data and render a graph page quickly.
  //TODO: minor issue is that it will grab exercises that haven't been attempted/completed yet and show them on graph. Could easily do a check on the corresponding workout within the store. Probably also a better way. For now, since it is a very very minor issue, I will leave it.
  exercisesArr.forEach(({ exerciseName, workingWeight, workoutDate }) => {
    if (exerciseName === "Squat") {
      squatDate.push(workoutDate);
      squatWeight.push(workingWeight);
    } else if (exerciseName === "Overhead Press") {
      overheadDate.push(workoutDate);
      overheadWeight.push(workingWeight);
    } else if (exerciseName === "Deadlift") {
      deadliftDate.push(workoutDate);
      deadliftWeight.push(workingWeight);
    } else if (exerciseName === "Bench Press") {
      benchDate.push(workoutDate);
      benchWeight.push(workingWeight);
    } else if (exerciseName === "Pendlay Row") {
      rowDate.push(workoutDate);
      rowWeight.push(workingWeight);
    }
  });

  const workoutData = {
    sq: {
      id: "sq",
      exerciseName: "Squat",
      dateData: squatDate,
      weightData: squatWeight,
    },
    op: {
      id: "op",
      exerciseName: "Overhead Press",
      dateData: overheadDate,
      weightData: overheadWeight,
    },
    dl: {
      id: "dl",
      exerciseName: "Deadlift",
      dateData: deadliftDate,
      weightData: deadliftWeight,
    },
    bp: {
      id: "bp",
      exerciseName: "Bench Press",
      dateData: benchDate,
      weightData: benchWeight,
    },
    pr: {
      id: "pr",
      exerciseName: "Pendlay Row",
      dateData: rowDate,
      weightData: rowWeight,
    },
  };

  useEffect(() => {
    dispatch(graphActions.setRawGraphData(workoutData));
  }, []);

  return (
    <div className="graph-page-container">
      <Graph />
    </div>
  );
}
