import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
import { GET_WORKOUTS, CREATE_WORKOUT } from "./workouts";
import { SET_USER, REMOVE_USER } from "./auth";

export default function exerciseReducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER:
      const exerciseIds = Object.keys(newState);
      const userId = action.user.id;
      console.log(userId);
      exerciseIds.forEach((exerciseId) => {
        newState[exerciseId].userId = userId;
      });
      return newState;
    case REMOVE_USER:
      const exerciseIds2 = Object.keys(newState);

      exerciseIds2.forEach((exerciseId) => {
        delete newState[exerciseId].userId;
      });
      return newState;
    case GET_WORKOUTS:
      const exerciseIds3 = Object.keys(action.exercises);
      action.sets = {};
      console.log(exerciseIds3);
      exerciseIds3.forEach((id) => {
        newState[id] = { id };
        const exercise = action.exercises[id];
        newState[id].exerciseName = exercise.ExerciseName.exerciseName;
        newState[id].workingWeight = exercise.WorkingWeight.weight;
        let relevantExerciseKeys = [
          "exerciseOrder",
          "id",
          "numRepsGoal",
          "numSets",
          "setIds",
          "workoutId",
        ];
        relevantExerciseKeys.forEach((relevantExerciseKey) => {
          newState[id][relevantExerciseKey] = exercise[relevantExerciseKey];
        });
        const sets = exercise.Sets;
        console.log(sets, action);
        sets.forEach((set) => {
          set.exerciseId = parseInt(id, 10);
          set.workoutId = exercise.workoutId;
          const setCopy = Object.assign({}, set);
          action.sets[set.id] = setCopy;
        });
      });
      delete action.exercises;
      return newState;
    case CREATE_WORKOUT:
			if (action.workout === "duplicate") {
        return newState;
      }
      const exerciseIds4 = Object.keys(action.exercises);
      action.sets = {};
      console.log(exerciseIds4);
      exerciseIds4.forEach((id) => {
        newState[id] = { id };
        const exercise = action.exercises[id];
        newState[id].exerciseName = exercise.ExerciseName.exerciseName;
        newState[id].workingWeight = exercise.WorkingWeight.weight;
        let relevantExerciseKeys = [
          "exerciseOrder",
          "id",
          "numRepsGoal",
          "numSets",
          "setIds",
          "workoutId",
        ];
        relevantExerciseKeys.forEach((relevantExerciseKey) => {
          newState[id][relevantExerciseKey] = exercise[relevantExerciseKey];
        });
        const sets = exercise.Sets;
        console.log(sets, action);
        sets.forEach((set) => {
          set.exerciseId = parseInt(id, 10);
          set.workoutId = exercise.workoutId;
          const setCopy = Object.assign({}, set);
          action.sets[set.id] = setCopy;
        });
      });
      delete action.exercises;
      return newState;

      // //-------------------------old
      // let copy2 = Object.assign({}, action.workout);
      // console.log(copy2);
      // // let newNewState = Object.assign({},state);
      // copy2.Exercises.forEach((exercise) => {
      //   exercise.exerciseName = exercise.ExerciseName.exerciseName;
      //   delete exercise.ExerciseName;
      //   exercise.weight = exercise.WorkingWeight.weight;
      //   delete exercise.WorkingWeight;
      //   let setIds = [];
      //   exercise.Sets.forEach((set) => {
      //     setIds.push(set.id);
      //   });
      //   exercise.setIds = setIds;
      //   // delete exercise.Sets;
      //   newState[exercise.id] = exercise;
      //   let newNestedState = Object.assign({}, newState[exercise.id]);
      //   delete newNestedState.Sets;
      //   newState[newNestedState.id] = newNestedState;
      //   // let newNewState =
      //   // delete newState[exercise.id].Sets;
      // });
      // return newState;
    default:
      return state;
  }
}
