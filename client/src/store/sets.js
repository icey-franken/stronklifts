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
      console.log(userId);
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
			// console.log('line 31 set',action)
      // let copy2 = Object.assign({}, action.workout);
      // console.log(copy2);
      // copy2.Exercises.forEach((exercise) => {
      //   // exercise.exerciseName = exercise.ExerciseName.exerciseName;
      //   // delete exercise.ExerciseName;
      //   // exercise.weight = exercise.WorkingWeight.weight;
      //   // delete exercise.WorkingWeight;
      //   // let setIds = [];
      //   exercise.Sets.forEach((set) => {
      //     // setIds.push(set.id);
      //     newState[set.id] = set;
      //     newState[set.id].exerciseId = exercise.id;
      //   });
      //   // delete exercise.Sets;
      //   // exercise.setIds = setIds;
      //   // newState[exercise.id] = exercise;
      // });
      // return newState;
    default:
      return state;
  }
}
