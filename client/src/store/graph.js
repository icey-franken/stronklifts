// const SET_RAW_GRAPH_DATA = "graph/SET_GRAPH_DATA";
const SET_USER_DAY_DIFF = "graph/SET_USER_DAY_DIFF";
const SET_USER_EX_DISP = "graph/SET_USER_EX_DISP";
const SET_GRAPH_LAYOUT = "graph/SET_GRAPH_LAYOUT";
const SET_DATE_RANGE = "graph/SET_DATE_RANGE";
const SET_WEIGHT_RANGE = "graph/SET_WEIGHT_RANGE";

export const graphActionTypes = {
  SET_USER_DAY_DIFF,
  SET_USER_EX_DISP,
  SET_GRAPH_LAYOUT,
  SET_DATE_RANGE,
  SET_WEIGHT_RANGE,
};

const setUserDayDiff = (userDayDiff) => ({
  type: SET_USER_DAY_DIFF,
  userDayDiff,
});

const setUserExDisp = (userExDisp) => ({
  type: SET_USER_EX_DISP,
  userExDisp,
});

const setGraphLayout = (graphLayout) => ({
  type: SET_GRAPH_LAYOUT,
  graphLayout,
});

const setDateRange = (dateRange) => ({
  type: SET_DATE_RANGE,
  dateRange,
});

const setWeightRange = (weightRange) => ({
  type: SET_WEIGHT_RANGE,
  weightRange,
});

export const graphActions = {
  setUserDayDiff,
  setUserExDisp,
  setGraphLayout,
  setDateRange,
  setWeightRange,
};

//defaults not really necessary for rawData and relevant data points - moreso doing this for myself. Use in example state part of wiki.
export default function graphReducer(
  state = {
    userOptions: {
      userDayDiff: "ALL",
      userExDisp: ["sq", "op", "dl", "bp", "pr"],
    },
    layout: {
      axisOffset: 70,
      xMargin: 50,
      width: 600,
      height: 500,
    },
    range: {},
  },
  action
) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  const newUserOptions = Object.assign({}, newState.userOptions);
  // const newLayout = Object.assign({}, newState.layout);
  const newRange = Object.assign({}, newState.range);
  switch (action.type) {
    case SET_USER_DAY_DIFF:
      newUserOptions.userDayDiff = action.userDayDiff;
      newState.userOptions = newUserOptions;
      return newState;
    case SET_USER_EX_DISP:
      newUserOptions.userExDisp = action.userExDisp;
      newState.userOptions = newUserOptions;
      return newState;
    // case SET_GRAPH_LAYOUT:
    // 	newLayout.
    case SET_DATE_RANGE:
      newRange.dateRange = action.dateRange;
      newState.range = newRange;
      return newState;
    case SET_WEIGHT_RANGE:
      newRange.weightRange = action.weightRange;
      newState.range = newRange;
      return newState;
    default:
      return state;
  }
}
