import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
const GET_WORKOUTS = "/workout/GET_WORKOUTS";
const CREATE_WORKOUT = "/workout/CREATE_WORKOUT";

//action pojo creator function
export const getWorkouts = (workouts) => ({ type: GET_WORKOUTS, workouts });
export const createWorkout = (workout) => ({ type: CREATE_WORKOUT, workout });

//thunk action creator
export const getWorkoutsThunk = (userId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/workouts/${userId}`);
    res.data = await res.json();
    if (res.ok) dispatch(getWorkouts(res.data.workouts));
    return res;
  };
};
window.getWorkoutsThunk = getWorkoutsThunk;

//needs work - need to figure out what to send to backend route.
export const createWorkoutThunk = (userId, workoutSplit, progress) => {
  return async (dispatch) => {
    const body = JSON.stringify({ workoutSplit, progress });
    const res = await fetch(`api/workouts/${userId}`, {
      method: "post",
      "Content-Type": "application/json",
      "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), //necessary?
      body,
    });
    res.data = await res.json();
    if (res.ok) dispatch(createWorkout(res.data.workout));
    return res;
  };
};
window.createWorkoutThunk = createWorkoutThunk;

//workout reducer
export default function workoutReducer(state = {}, action) {
  Object.freeze(state);
	let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_WORKOUTS:
      action.workouts.forEach((workout) => {
        newState[workout.id] = workout;
      });
      return newState;
    case CREATE_WORKOUT:
      newState[action.workout.id] = action.workout;
      return newState;
    default:
      return state;
  }
}
