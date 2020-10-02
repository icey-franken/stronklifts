const SET_RAW_GRAPH_DATA = "graph/SET_GRAPH_DATA";
const SET_USER_DAY_DIFF = "graph/SET_USER_DAY_DIFF";
const SET_USER_EX_DISP = "graph/SET_USER_EX_DISP";

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

export default function graphReducer(
  state = { rawData: {}, userOptions: { userDayDiff: "ALL", userExDisp: ["sq", "op", "dl", "bp", "pr"] } },
  action
) {
  Object.freeze(state);
	const newState = Object.assign({}, state);
	const newUserOptions = Object.assign({}, newState.userOptions);
  switch (action.type) {
    case SET_RAW_GRAPH_DATA:
      const newRawData = Object.assign({}, newState.rawData);
      const workoutDataIds = Object.keys(action.rawGraphData);
      workoutDataIds.forEach((id) => {
        newRawData[id] = action.rawGraphData[id];
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
