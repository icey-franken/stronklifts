import { graphActionTypes } from "./graph";
//from graph:
//I might need to move this to a different slice of state (relevant graph data or something). The idea is that when raw graph data first grabbed, I want to set the relevantDataPoints slice of state based on userDayDiff.
//I also want to update the relevant datapoints slice of state whenever a set user day diff or set user ex disp action is dispatched.
export default function relevantGraphDataReducer(state = {}, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case graphActionTypes.SET_RAW_GRAPH_DATA:
      //do a thing
      return newState;
    case graphActionTypes.SET_USER_DAY_DIFF:
      //do a thing
      return newState;
    // case graphActionTypes.SET_USER_EX_DISP:
    //   //do a thing
    //   return newState;
    default:
      return newState;
  }
}
