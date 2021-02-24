import Cookies from "js-cookie"; //this module allows us to grab cookies

//action types
// export const NEW_USER = "workout/NEW_USER";
const GET_WORKOUTS = "workout/GET_WORKOUTS";
const CREATE_WORKOUT = "workout/CREATE_WORKOUT";
const COMPLETE_WORKOUT = "workout/COMPLETE_WORKOUT";
const DELETE_WORKOUT = "workout/DELETE_WORKOUT";

export const workoutActionTypes = {
  GET_WORKOUTS,
  CREATE_WORKOUT,
  COMPLETE_WORKOUT,
  DELETE_WORKOUT,
};

//action pojo creator function
// const newUser = () => ({ type: NEW_USER }); //sets workout loaded to true
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
    if (!userId) {
      return;
    }
    try {
      const res = await fetch(`/api/workouts/${userId}`);
      if (!res.ok) throw res;
      res.data = await res.json();
      dispatch(getWorkouts(res.data.workouts));
      return res;
    } catch (err) {
      console.error(err);
    }
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
      console.error(err);
      return;
    }
  };
};

//I think it can dispatch a createWorkout action all the same - it does the same stuff?
//Actually the workout should already be created, and as it is changed by user it should be updated in the store. So what we send to the database doesn't need to be seen by the store at all because it'll already be there.
const updateWorkoutCompleteThunk = (workoutId, workoutComplete) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ workoutComplete });
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
      console.error(err);
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
      console.error(err);
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
export default function workoutReducer(
  state = { workoutsLoaded: false, hasWorkouts: false },
  action
) {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_WORKOUTS:
      if (action.workouts.length === 0) {
        action.hasWorkouts = false;
        newState = {};
        newState.workoutsLoaded = true;
        newState.hasWorkouts = false;
        return newState;
      }
      newState.hasWorkouts = true;

      action.exercises = {};
      action.workouts.forEach((workout) => {
        handleGetAndCreateWorkout(newState, workout, action);
      });
      delete action.workouts;
      newState.workoutsLoaded = true;
      return newState;
    case CREATE_WORKOUT:
      const { workout } = action;
      //if workout already exists, just return state as is
      if (newState[workout.id]) {
        workout = "duplicate";
        return newState;
      } else {
        action.exercises = {};
        handleGetAndCreateWorkout(newState, workout, action);
        delete action.workout;
      }
      newState.hasWorkouts = true;
      return newState;
    case COMPLETE_WORKOUT:
      newState[action.workoutId].workoutComplete = action.workoutComplete;
      return newState;
    case DELETE_WORKOUT:
      delete newState[action.workoutId];
      // workouts slice always has "workoutsLoaded" and "hasWorkouts" properties - if length < 3 then no workouts exist
      if (Object.keys(newState).length < 3) {
        newState.hasWorkouts = false;
      }
      return newState;
    default:
      return state;
  }
}

function createExerciseSliceAndExtractIds(newState, workout, action) {
  const { id: workoutId, workoutDate } = workout;
  //gather exercise ids and set ids to define on workout slice
  const workoutExerciseIds = [];
  const workoutSetIds = [];
  workout.Exercises.forEach((exercise) => {
    exercise.workoutId = workoutId;
    exercise.workoutDate = workoutDate;
    workoutExerciseIds.push(exercise.id);
    // gather set ids to define on exercise slice
    const exerciseSetIds = [];
    exercise.Sets.forEach((set) => {
      exerciseSetIds.push(set.id);
    });
    exercise.setIds = exerciseSetIds;
    workoutSetIds.push(...exerciseSetIds);
    newState[workoutId].setIds = workoutSetIds;
    newState[workoutId].exerciseIds = workoutExerciseIds;
    action.exercises[exercise.id] = Object.assign({}, exercise);
  });
  return action;
}

function extractAndSetWorkoutNote(newState, workout) {
  const { WorkoutNote, id } = workout;
  newState[id].workoutNote = WorkoutNote ? WorkoutNote.description : null;
}

function extractAndSetWorkoutSlice(newState, workout) {
  // const workout = action.workout;
  const { id: workoutId, workoutDate, workoutComplete, workoutSplit } = workout;
  newState[workoutId] = {
    id: workoutId,
    workoutDate,
    workoutComplete,
    workoutSplit,
  };
}

function handleGetAndCreateWorkout(newState, workout, action) {
  extractAndSetWorkoutSlice(newState, workout);
  extractAndSetWorkoutNote(newState, workout);
  createExerciseSliceAndExtractIds(newState, workout, action);
}
