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
        // newState[]

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
          console.log("line 64", exercise);
          exercise.Sets.forEach((set) => {
            exerciseSetIds.push(set.id);
          });
          // console.log(setIds);
					exercise.setIds = exerciseSetIds;
					workoutSetIds.push(...exerciseSetIds);
          // workout.setIds = setIds;
          // exercise.workoutNoteId = workout.workoutNoteId;
          // exercise.forEach(({Sets})=>{
          // setIds.push(Sets.id);
          // })
          // console.log(exercise);
				});
				newState[workoutId].setIds = workoutSetIds;
				newState[workoutId].exerciseIds = exerciseIds;
        // exerciseArr.push([...exercises]);

        // workout.exerciseIds = exerciseIds;
        console.log("workout line 75", workout);
        // workout.setIds = setIds;
        //I don't think workout needs to know about sets - we can let exercises worry about that. If sets change, exercises will change, therefore so will workouts? Ignore for now.

        // stateToPassToExerciseRed.exerciseIds = exerciseIds;

        // delete workout.WorkoutNote;

        //replace exercises object on workout object with an array containing exercise ids
        // workout.exerciseIds = exerciseIds;
        // exercise.setIds = setIds;
        // delete exercise.Sets;

        // delete workout.Exercises;
        // newState[workout.id] = workout;
        // let newNestedState = Object.assign({}, newState[workout.id]);
        // delete newNestedState.Exercises;
        // newState[newNestedState.id] = newNestedState;
        //send exercises object to the exercises reducer along with workout id
        //!!!function call sending workout.id and exercises

        // const note = workout.WorkoutNote.
        //follow similar process for sets and workout note, but in exercises reducer
        // newState[workoutId] = workout;
        // exerciseArr.forEach((exercise) => {
        //   exercisesState[exercise.id] = exercise;
				// });
				// const exerciseState = Object.assign({},action.workout.Exercises)
				console.log('line 133 workuot.',workout.Exercises);

				// const newAction = {exercises: {}};
				workout.Exercises.forEach(exercise=>{
					const exerciseCopy = Object.assign({}, exercise);
					console.log('line 135 loop',exercise)
					action.exercises[exercise.id] = exerciseCopy;
				})
				// action.exercises
				// action.exercises[exerciseState.]
        // delete action.workout;
        // action.exercise = exercisesState;
        // console.log("line 126 workouts", action.exercise);
			});
			delete action.workouts;
			console.log('line 148 action', action);
      return newState;
    case CREATE_WORKOUT:
      //if workout already exists, just return state as is
      if (newState[action.workout.id]) return newState;
      else {
        const copy = Object.assign({}, action.workout);
        const workoutId = copy.id;

        //pull exercises object off of workout
        const exerciseIds = [];
        const setIds = [];
        //get exercise ids from exercises object
        copy.Exercises.forEach((exercise) => {
          exerciseIds.push(exercise.id);
          exercise.Sets.forEach((set) => {
            setIds.push(set.id);
          });
          // console.log(exercise);
        });
        copy.setIds = setIds;
        //I don't think workout needs to know about sets - we can let exercises worry about that. If sets change, exercises will change, therefore so will workouts? Ignore for now.

        //replace exercises object on workout object with an array containing exercise ids
        copy.exerciseIds = exerciseIds;
        delete copy.Exercises;
        //send exercises object to the exercises reducer along with workout id
        //!!!function call sending workout.id and exercises

        const { WorkoutNote } = copy;
        if (WorkoutNote) {
          copy.workoutNoteId = WorkoutNote.id;
          // const workoutNote = WorkoutNote.description;
          //!!!send workoutNote to workoutNote reducer along with workout id
        } else {
          copy.workoutNoteId = null;
        }
        delete copy.WorkoutNote;

        // const note = workout.WorkoutNote.
        newState[workoutId] = copy;
        return newState;
      }
    default:
      return state;
  }
}
