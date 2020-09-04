import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
export const GET_WORKOUTS = "workout/GET_WORKOUTS";
export const CREATE_WORKOUT = "workout/CREATE_WORKOUT";

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
export const createWorkoutThunk = (userId) => {
  //, workoutSplit, progress
  return async (dispatch) => {
    // const body = JSON.stringify({ workoutSplit, progress });
    const res = await fetch(`api/workouts/${userId}`, {
      method: "post",
      headers: {
        "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        // "Content-Type": "application/json",
      },
    });
    res.data = await res.json();
    if (res.ok) {
      const workout = res.data.newWorkout;
      dispatch(createWorkout(workout));
      return workout.id;
    }

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
      action.exercises = {};
      action.workouts.forEach((workout) => {
        const workoutId = workout.id;
        newState[workoutId] = {
          id: workoutId,
          workoutDate: workout.workoutDate,
          workoutComplete: workout.workoutComplete,
          workoutSplit: workout.workoutSplit,
        };

        const { WorkoutNote } = workout;
        if (WorkoutNote) {
          newState[workoutId].workoutNoteId = WorkoutNote.id;

          //grab this before workout reducer. Don't care right now.
          const workoutNote = WorkoutNote.description;
          //!!!send workoutNote to workoutNote reducer along with workout id
        } else {
          newState[workoutId].workoutNoteId = null;
        }
        //pull exercises object off of workout
        let stateToPassToExerciseRed = Object.assign({}, workout.Exercises);
        const exercises = workout.Exercises;
        const exerciseIds = [];
        //get exercise ids from exercises object
        const workoutSetIds = [];
        exercises.forEach((exercise) => {
          exercise.workoutId = workoutId;
          exerciseIds.push(exercise.id);
          const exerciseSetIds = [];
          exercise.Sets.forEach((set) => {
            exerciseSetIds.push(set.id);
          });
          exercise.setIds = exerciseSetIds;
          workoutSetIds.push(...exerciseSetIds);
          newState[workoutId].setIds = workoutSetIds;
          newState[workoutId].exerciseIds = exerciseIds;
          workout.Exercises.forEach((exercise) => {
            const exerciseCopy = Object.assign({}, exercise);
            action.exercises[exercise.id] = exerciseCopy;
          });
        });
      });
      delete action.workouts;
      return newState;
    case CREATE_WORKOUT:
      //if workout already exists, just return state as is
      if (newState[action.workout.id]) {
        action.workout = "duplicate";
        return newState;
      } else {
        action.exercises = {};
        const workout = action.workout;
        const workoutId = workout.id;
        newState[workoutId] = {
          id: workoutId,
          workoutDate: workout.workoutDate,
          workoutComplete: workout.workoutComplete,
          workoutSplit: workout.workoutSplit,
        };

        const { WorkoutNote } = workout;
        if (WorkoutNote) {
          newState[workoutId].workoutNoteId = WorkoutNote.id;

          //grab this before workout reducer. Don't care right now.
          const workoutNote = WorkoutNote.description;
          //!!!send workoutNote to workoutNote reducer along with workout id
        } else {
          newState[workoutId].workoutNoteId = null;
        }
        //pull exercises object off of workout

        const exercises = workout.Exercises;
        const exerciseIds = [];
        //get exercise ids from exercises object
        const workoutSetIds = [];
        exercises.forEach((exercise) => {
          exercise.workoutId = workoutId;
          exerciseIds.push(exercise.id);
          const exerciseSetIds = [];
          exercise.Sets.forEach((set) => {
            exerciseSetIds.push(set.id);
          });
          exercise.setIds = exerciseSetIds;
          workoutSetIds.push(...exerciseSetIds);
          newState[workoutId].setIds = workoutSetIds;
          newState[workoutId].exerciseIds = exerciseIds;
          workout.Exercises.forEach((exercise) => {
            const exerciseCopy = Object.assign({}, exercise);
            action.exercises[exercise.id] = exerciseCopy;
          });
        });
        delete action.workout;
      }
      return newState;
    default:
      return state;
  }
}
