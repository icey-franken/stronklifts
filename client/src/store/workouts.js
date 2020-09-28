import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
export const GET_WORKOUTS = "workout/GET_WORKOUTS";
export const CREATE_WORKOUT = "workout/CREATE_WORKOUT";
export const COMPLETE_WORKOUT = "workout/COMPLETE_WORKOUT";
export const DELETE_WORKOUT = "workout/DELETE_WORKOUT";

//action pojo creator function
const getWorkouts = (workouts) => ({ type: GET_WORKOUTS, workouts });

const createWorkout = (workout) => ({ type: CREATE_WORKOUT, workout });

const updateWorkoutComplete = (workoutId, workoutComplete) => ({
  type: COMPLETE_WORKOUT,
  workoutId,
  workoutComplete,
});

const deleteWorkout = (workoutId, exerciseIds, setIds) => ({
  type: DELETE_WORKOUT,
  workoutId,
  exerciseIds,
  setIds,
});

export const workoutActions = {
  getWorkouts,
  createWorkout,
  updateWorkoutComplete,
  deleteWorkout,
};

//thunk action creator
const getWorkoutsThunk = (userId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/workouts/${userId}`);
    res.data = await res.json();
    if (res.ok) dispatch(getWorkouts(res.data.workouts));
    return res;
  };
};

//needs work - need to figure out what to send to backend route.
const createWorkoutThunk = (userId, wwValues) => {
  //can pass an array of wwStates for exercisenames to change default values of new workouts.
  // setStartingWeightThunk(userId, exerciseNameId, wwStates[index][0])

  //, workoutSplit, progress
  return async (dispatch) => {
    try {
      let options = {
        method: "post",
        headers: {
          "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      };
      if (wwValues) {
        let body = JSON.stringify({ wwValues });
        options = {
          method: "post",
          headers: {
            "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            "Content-Type": "application/json",
          },
          body,
        };
      }
      const res = await fetch(`/api/workouts/${userId}`, options);
      if (!res.ok) {
        throw res;
      }
      res.data = await res.json();
      const workout = res.data.newWorkout;
      dispatch(createWorkout(workout));
      return workout.id;
    } catch (err) {
      console.log(err);
      return;
    }
  };
};
window.createWorkoutThunk = createWorkoutThunk;

//I think it can dispatch a createWorkout action all the same - it does the same stuff?
//Actually the workout should already be created, and as it is changed by user it should be updated in the store. So what we send to the database doesn't need to be seen by the store at all because it'll already be there.
const updateWorkoutCompleteThunk = (workoutId, workoutComplete) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ workoutComplete });
      console.log("line91workout.js", workoutId, workoutComplete);
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "put",
        headers: {
          "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          "Content-Type": "application/json",
        },
        body,
      });
      if (!res.ok) throw res;
      // res.data = await res.json();
      //dont need to do any of this because we're just updating it in the database
      // if (res.ok) {
      //   const workout = res.data.newWorkout;
      //   dispatch(createWorkout(workout));
      //   return workout.id;
      // }
      // return res;
    } catch (err) {
      console.log(err);
    }
    dispatch(updateWorkoutComplete(workoutId, workoutComplete));
  };
};

const deleteWorkoutThunk = (workoutId) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "delete",
        headers: { "XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
      });
      if (!res.ok) throw res;
      const data = await res.json();
      const { exerciseIds, setIds } = data;

      dispatch(deleteWorkout(workoutId, exerciseIds, setIds));
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};

export const workoutThunks = {
  getWorkouts: getWorkoutsThunk,
  createWorkout: createWorkoutThunk,
  updateWorkoutComplete: updateWorkoutCompleteThunk,
  deleteWorkout: deleteWorkoutThunk,
};

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

        newState[workoutId].workoutNote = null;
        const { WorkoutNote } = workout;
        if (WorkoutNote) {
          newState[workoutId].workoutNote = WorkoutNote.description;
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

        newState[workoutId].workoutNote = null;
        const { WorkoutNote } = workout;
        if (WorkoutNote) {
          newState[workoutId].workoutNote = WorkoutNote.description;
        }
        //pull exercises object off of workout

        const exercises = workout.Exercises;
        const exerciseIds = [];
        //get exercise ids from exercises object
        const workoutSetIds = [];
        if (exercises) {
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
        }
        delete action.workout;
      }
      return newState;
    case COMPLETE_WORKOUT:
      newState[action.workoutId].workoutComplete = action.workoutComplete;
      return newState;
    case DELETE_WORKOUT:
      delete newState[action.workoutId];
      return newState;
    default:
      return state;
  }
}
