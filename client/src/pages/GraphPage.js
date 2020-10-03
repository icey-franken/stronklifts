import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Graph from "../components/Graph/Graph";
import { graphDataActions } from "../store/graphData";
import { graphActions } from "../store/graph";

export default function GraphPage() {
  const exercises = useSelector((state) => state.exercises);
  const exercisesArr = Object.values(exercises);
  exercisesArr.sort((a, b) => (a.workoutDate > b.workoutDate ? 1 : -1));
  const { userDayDiff, userExDisp } = useSelector(
    (state) => state.graph.userOptions
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  //alllllll this stuff should be happening in the store

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
      rawDateData: squatDate,
      rawWeightData: squatWeight,
      relevantDateData: squatDate,
      relevantWeightData: squatWeight,
    },
    op: {
      id: "op",
      rawDateData: overheadDate,
      rawWeightData: overheadWeight,
      relevantDateData: overheadDate,
      relevantWeightData: overheadWeight,
    },
    dl: {
      id: "dl",
      rawDateData: deadliftDate,
      rawWeightData: deadliftWeight,
      relevantDateData: deadliftDate,
      relevantWeightData: deadliftWeight,
    },
    bp: {
      id: "bp",
      rawDateData: benchDate,
      rawWeightData: benchWeight,
      relevantDateData: benchDate,
      relevantWeightData: benchWeight,
    },
    pr: {
      id: "pr",
      rawDateData: rowDate,
      rawWeightData: rowWeight,
      relevantDateData: rowDate,
      relevantWeightData: rowWeight,
    },
  };

  //CALCULATE OLDEST WORKOUT IF SELECTED USERDAYDIFF IS ALL----
  function calculateDateRange(userDayDiff, relevantDataPointsObj) {
    if (userDayDiff !== "ALL") {
      return userDayDiff;
    }
    const nowMs = Date.now(); //constant used for date range calcs
    const msPerDay = 8.64e7; //constant used to convert ms to days
    let oldestDate = null;
    for (let exercise in relevantDataPointsObj) {
      const { relevantDateData } = relevantDataPointsObj[exercise];
      const exerciseOldestDate = relevantDateData[0];
      if (oldestDate === null || oldestDate > exerciseOldestDate) {
        oldestDate = exerciseOldestDate;
      }
    }
    const dateMs = new Date(oldestDate);
    const dateRange = Math.ceil((nowMs - dateMs) / msPerDay);
    return dateRange;
  }

  //CALCULATE MAX AND MIN WEIGHTS FOR ALL SELECTED EXERCISES----
  function calculateWeightRange(relevantDataPointsObj) {
    let minWeight = null;
    let maxWeight = null;
    for (const exercise in relevantDataPointsObj) {
      const { relevantWeightData } = relevantDataPointsObj[exercise];
      const exerciseMinWeight = Math.min(...relevantWeightData) - 5;
      const exerciseMaxWeight = Math.max(...relevantWeightData) + 5;
      if (minWeight === null || exerciseMinWeight < minWeight) {
        minWeight = exerciseMinWeight;
      }
      if (maxWeight === null || exerciseMaxWeight > maxWeight) {
        maxWeight = exerciseMaxWeight;
      }
    }
    return [minWeight, maxWeight];
  }

  function grabAllDataForUserSelection(workoutData, userExDisp) {
    let relevantDataPointsObj = {};
    userExDisp.forEach((userEx) => {
      const { relevantDateData, relevantWeightData } = workoutData[userEx];
      relevantDataPointsObj[userEx] = { relevantDateData, relevantWeightData };
    });
    return relevantDataPointsObj;
  }

  useEffect(() => {
    dispatch(graphDataActions.setGraphData(workoutData));
    const relDPO = grabAllDataForUserSelection(workoutData, userExDisp);
    const weightRange = calculateWeightRange(relDPO);
    const dateRange = calculateDateRange(userDayDiff, relDPO);
    dispatch(graphActions.setDateRange(dateRange));
    dispatch(graphActions.setWeightRange(weightRange));
    setIsLoaded(true);
  }, [userDayDiff]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="graph-page-container">
      <Graph />
    </div>
  );
}
