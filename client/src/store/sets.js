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
      let copy = [...action.workouts];
      console.log(copy);
      copy.forEach((workout) => {
        workout.Exercises.forEach((exercise) => {
          // exercise.exerciseName = exercise.ExerciseName.exerciseName;
          // delete exercise.ExerciseName;
          // exercise.weight = exercise.WorkingWeight.weight;
          // delete exercise.WorkingWeight;
					// let setIds = [];
					console.log(exercise);
          if (exercise.Sets) {
            exercise.Sets.forEach((set) => {
              // setIds.push(set.id);
              newState[set.id] = set;
              newState[set.id].exerciseId = exercise.id;
            });
            // delete exercise.Sets;
            // exercise.setIds = setIds;
            // newState[exercise.id] = exercise;
          }
        });
      });
      return newState;
    case CREATE_WORKOUT:
      let copy2 = Object.assign({}, action.workout);
      console.log(copy2);
      copy2.Exercises.forEach((exercise) => {
        // exercise.exerciseName = exercise.ExerciseName.exerciseName;
        // delete exercise.ExerciseName;
        // exercise.weight = exercise.WorkingWeight.weight;
        // delete exercise.WorkingWeight;
        // let setIds = [];
        exercise.Sets.forEach((set) => {
          // setIds.push(set.id);
          newState[set.id] = set;
          newState[set.id].exerciseId = exercise.id;
        });
        // delete exercise.Sets;
        // exercise.setIds = setIds;
        // newState[exercise.id] = exercise;
      });
      return newState;
    default:
      return state;
  }
}
