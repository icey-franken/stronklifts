// const SET_RAW_GRAPH_DATA = "graph/SET_GRAPH_DATA";
const SET_USER_DAY_DIFF = "graph/SET_USER_DAY_DIFF";
const SET_USER_EX_DISP = "graph/SET_USER_EX_DISP";

export const graphActionTypes = {
  SET_USER_DAY_DIFF,
  SET_USER_EX_DISP,
};

const setUserDayDiff = (userDayDiff) => ({
  type: SET_USER_DAY_DIFF,
  userDayDiff,
});

const setUserExDisp = (userExDisp) => ({
  type: SET_USER_EX_DISP,
  userExDisp,
});

export const graphActions = {
  setUserDayDiff,
  setUserExDisp,
};

//defaults not really necessary for rawData and relevant data points - moreso doing this for myself. Use in example state part of wiki.
export default function graphReducer(
  state = {
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
