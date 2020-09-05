import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
import { GET_WORKOUTS, CREATE_WORKOUT } from "./workouts";
import { SET_USER, REMOVE_USER } from "./auth";

const UPDATE_REPS = "sets/UPDATE_REPS";

export const updateReps = (setId, numRepsActual) => ({
  type: UPDATE_REPS,
  id: setId,
  numRepsActual,
});

export const updateRepsThunk = (setId, numRepsActual) => {
  return async (dispatch) => {
		try{
			console.log(numRepsActual);
			const body = JSON.stringify( {numRepsActual})
			console.log(body);
    const res = await fetch(`/api/sets/${setId}`, {
      method: "patch",
      headers: {
        "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        "Content-Type": "application/json",
      },
      body,
		});
		if(!res.ok) throw res;
		dispatch(updateReps(setId, numRepsActual));
		return res;
	} catch(err) {console.log(err)}
  };
};

export default function setReducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  let setIds = Object.keys(newState);
  switch (action.type) {
    case SET_USER:
      const userId = action.user.id;
      setIds.forEach((setId) => {
        newState[setId].userId = userId;
      });
      return newState;
    case REMOVE_USER:
      setIds.forEach((setId) => {
        delete newState[setId].userId;
      });
      return newState;
    case GET_WORKOUTS:
      const actionSetIds = Object.keys(action.sets);
      actionSetIds.forEach((id) => {
        newState[id] = action.sets[id];
      });
      return newState;
    case CREATE_WORKOUT:
      if (action.workout === "duplicate") {
        return newState;
      }
      const actionSetIds2 = Object.keys(action.sets);
      actionSetIds2.forEach((id) => {
        newState[id] = action.sets[id];
      });
      return newState;
    case UPDATE_REPS:
      newState[action.id].numRepsActual = parseInt(action.numRepsActual, 10);
    default:
      return state;
  }
}
