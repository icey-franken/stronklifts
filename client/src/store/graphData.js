import { graphActionTypes } from "./graph";

const SET_GRAPH_DATA = "graph/SET_GRAPH_DATA";

export const graphDataActionTypes = {
  SET_GRAPH_DATA,
};

const setGraphData = (graphData) => ({
  type: SET_GRAPH_DATA,
  graphData,
});

export const graphDataActions = {
  setGraphData,
};

//we know the default day diff is all - so on the initial load we could grab relevant x and y data based on day diff of all.
//then, when day diff is changed an action will be dispatched that will hit this reducer and we will update relevant data accordingly.
export default function graphDataReducer(
  state = {
    // sq: {
    //   id: "sq",
    //   rawDateData: [],
    //   rawWeightData: [],
    //   relevantDateData: [],
    //   relevantWeightData: [],
    // },
    // op: {
    //   id: "op",
    //   rawDateData: [],
    //   rawWeightData: [],
    //   relevantDateData: [],
    //   relevantWeightData: [],
    // },
    // dl: {
    //   id: "dl",
    //   rawDateData: [],
    //   rawWeightData: [],
    //   relevantDateData: [],
    //   relevantWeightData: [],
    // },
    // bp: {
    //   id: "bp",
    //   rawDateData: [],
    //   rawWeightData: [],
    //   relevantDateData: [],
    //   relevantWeightData: [],
    // },
    // pr: {
    //   id: "pr",
    //   rawDateData: [],
    //   rawWeightData: [],
    //   relevantDateData: [],
    //   relevantWeightData: [],
    // },
  },
  action
) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_GRAPH_DATA:
      // const actionWorkoutDataIds = Object.keys(action.graphData);
      // actionWorkoutDataIds.forEach((id) => {
      for (let id in action.graphData) {
				const newStateSlice = Object.assign({}, newState[id]);
				newStateSlice.id = id;
        const actionRawDataSlice = action.graphData[id];
        const {
          rawDateData: actionRawDateData,
          rawWeightData: actionRawWeightData,
        } = actionRawDataSlice;
        newStateSlice.rawDateData = actionRawDateData;
        newStateSlice.rawWeightData = actionRawWeightData;
        //default userDayDiff is 'ALL' so relevant and raw are the same
        newStateSlice.relevantDateData = actionRawDateData;
        newStateSlice.relevantWeightData = actionRawWeightData;
				newState[id] = newStateSlice;
      }
      return newState;
    case graphActionTypes.SET_USER_DAY_DIFF:
      for (let id in newState) {
        console.log("hits graph data reducer");
        const newStateSlice = Object.assign({}, newState[id]);
        const relevantIndex = findRelevantDateIndex(
          action.userDayDiff,
          newStateSlice.rawDateData
        );
        const relevantDateData = newStateSlice.rawDateData.slice(relevantIndex);
        const relevantWeightData = newStateSlice.rawWeightData.slice(
          relevantIndex
        );
        newStateSlice.relevantDateData = relevantDateData;
        newStateSlice.relevantWeightData = relevantWeightData;
        newState[id] = newStateSlice;
			}
		// case graphActionTypes.SET_USER_EX_DISP:

    default:
      return newState;
  }
}

// const relevantIndex = findRelevantIndex(userDayDiff, rawDateData);
// relevantDateData = actionRawDateData.slice(relevantIndex);
// relevantWeightData = actionRawWeightData.slice(relevantIndex);

//NECESSARY FOR REDUCER!
function findRelevantDateIndex(userDayDiff, rawDateData) {
  if (userDayDiff === "ALL") {
    return 0;
  }
  const nowMs = Date.now(); //constant used for date range calcs
  const msPerDay = 8.64e7; //constant used to convert ms to days
  //rawDateData sorted from oldest to newest
  //start at end of rawDateData and return index at which dayDiff is greater than userDayDiff
  const calcDayDiff = (index) => {
    //so that error not thrown when checking oldest data point
    if (index >= 0) {
      return (nowMs - new Date(rawDateData[index])) / msPerDay;
    }
  };
  //consider changing from checking based on ms to checking based on day (e.g. so that a lift that happened early in the morning 7 days ago isn't excluded if graph used at night - for now it's fine)
  let i = rawDateData.length - 1;
  let dayDiff = calcDayDiff(i);
  while (dayDiff < userDayDiff && i >= 0) {
    i--;
    dayDiff = calcDayDiff(i);
  }
  i++;
  return i;
}


//delete??????
//GRAB RELEVANT DATA POINTS BASED ON USER INPUT AND SPLIT------
//FOR SINGLE EXERCISE - extract only data relevant to the selected userDayDifF
function grabRelevantDataPoints(userDayDiff, rawDateData, rawWeightData) {
  if (userDayDiff === "ALL") {
    return [rawDateData, rawWeightData];
  }
  const nowMs = Date.now(); //constant used for date range calcs
  const msPerDay = 8.64e7; //constant used to convert ms to days
  //dataPoints array is sorted from oldest to most recent workout.
  //so, start at end of datapoints array and find index at which dayDiff is greater than userDayDiff
  //slice dataPoints from there and return that - that is your relevant dataPoints array.
  const calcDayDiff = (index) => {
    //so that error not thrown when checking oldest data point
    if (index >= 0) {
      return (nowMs - new Date(rawDateData[index])) / msPerDay;
    }
  };
  //consider changing from checking based on ms to checking based on day (e.g. so that a lift that happened early in the morning 7 days ago isn't excluded if graph used at night - for now it's fine)
  let i = rawDateData.length - 1;
  let dayDiff = calcDayDiff(i);
  while (dayDiff < userDayDiff && i >= 0) {
    i--;
    dayDiff = calcDayDiff(i);
  }
  //if i goes down to -1 (all workouts valid) then we end up returning the entire dataPoints array.
  return [rawDateData.slice(i + 1), rawWeightData.slice(i + 1)];
}

//FOR ALL SELECTED EXERCISES - PUT ALL RELEVANT DATA INTO ONE OBJECT WITH KEYS CORRESPONDING TO USEREXDISP SELECTIONS
function grabAllDataForUserSelection(workoutData, userExDisp) {
  let relevantDataPointsObj = {};
  userExDisp.forEach((userEx) => {
    const { rawDateData, rawWeightData } = workoutData[userEx];
    const relevantDataPoints = grabRelevantDataPoints(
      // userDayDiff,
      rawDateData,
      rawWeightData
    );
    const [xData, yData] = relevantDataPoints;
    // separateDateAndWeight(relevantDataPoints);
    relevantDataPointsObj[userEx] = { xData, yData };
  });
  return relevantDataPointsObj;
}
