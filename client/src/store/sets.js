import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
import { GET_WORKOUTS, CREATE_WORKOUT } from "./workouts";
import { SET_USER, REMOVE_USER } from "./auth";

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
			actionSetIds.forEach(id=>{
				newState[id] = action.sets[id];
			});
      return newState;
    case CREATE_WORKOUT:
			if (action.workout === "duplicate") {
        return newState;
      }
			const actionSetIds2 = Object.keys(action.sets);
			actionSetIds2.forEach(id=>{
				newState[id] = action.sets[id];
			});
      return newState;
    default:
      return state;
  }
}
