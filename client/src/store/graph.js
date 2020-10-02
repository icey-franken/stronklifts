const SET_RAW_GRAPH_DATA = "graph/SET_GRAPH_DATA";
const SET_USER_DAY_DIFF = "graph/SET_USER_DAY_DIFF";
const SET_USER_EX_DISP = "graph/SET_USER_EX_DISP";

export const graphActionTypes = {
  SET_RAW_GRAPH_DATA,
  SET_USER_DAY_DIFF,
  SET_USER_EX_DISP,
};

const setRawGraphData = (rawGraphData) => ({
  type: SET_RAW_GRAPH_DATA,
  rawGraphData,
});

const setUserDayDiff = (userDayDiff) => ({
  type: SET_USER_DAY_DIFF,
  userDayDiff,
});

const setUserExDisp = (userExDisp) => ({
  type: SET_USER_EX_DISP,
  userExDisp,
});

export const graphActions = { setRawGraphData, setUserDayDiff, setUserExDisp };

//defaults not really necessary for rawData and relevant data points - moreso doing this for myself. Use in example state part of wiki.
export default function graphReducer(
  state = {
    rawData: {
      sq: {
        id: "sq",
        exerciseName: "Squat",
        dateData: [],
        weightData: [],
      },
      op: {
        id: "op",
        exerciseName: "Overhead Press",
        dateData: [],
        weightData: [],
      },
      dl: {
        id: "dl",
        exerciseName: "Deadlift",
        dateData: [],
        weightData: [],
      },
      bp: {
        id: "bp",
        exerciseName: "Bench Press",
        dateData: [],
        weightData: [],
      },
      pr: {
        id: "pr",
        exerciseName: "Pendlay Row",
        dateData: [],
        weightData: [],
      },
    },
    relevantDataPoints: {
      sq: { id: "sq", xData: [], yData: [] },
      op: { id: "op", xData: [], yData: [] },
      dl: { id: "dl", xData: [], yData: [] },
      bp: { id: "bp", xData: [], yData: [] },
      pr: { id: "pr", xData: [], yData: [] },
    },
    userOptions: {
      userDayDiff: "ALL",
      userExDisp: ["sq", "op", "dl", "bp", "pr"],
    },
  },
  action
) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  const newUserOptions = Object.assign({}, newState.userOptions);
  switch (action.type) {
    case SET_RAW_GRAPH_DATA:
      const newRawData = Object.assign({}, newState.rawData);
      const actionWorkoutDataIds = Object.keys(action.rawGraphData);
      actionWorkoutDataIds.forEach((id) => {
        const newRawDataSlice = Object.assign({}, newRawData[id]);
        const actionRawDataSlice = action.rawGraphData[id];
        newRawDataSlice.dateData = actionRawDataSlice.dateData;
        newRawDataSlice.weightData = actionRawDataSlice.weightData;
        newRawData[id] = newRawDataSlice;
      });
      newState.rawData = newRawData;
      return newState;
    case SET_USER_DAY_DIFF:
      newUserOptions.userDayDiff = action.userDayDiff;
      newState.userOptions = newUserOptions;
      return newState;
    case SET_USER_EX_DISP:
      newUserOptions.userExDisp = action.userExDisp;
      newState.userOptions = newUserOptions;
      return newState;
    default:
      return state;
  }
}
