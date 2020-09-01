//action types
const GET_WORKOUTS = '/workout/GET_WORKOUTS'


//action pojo creator function
export const getWorkouts = (workouts) => ({type: GET_WORKOUTS, workouts});




//thunk action creator
export const getWorkoutsThunk = (userId) => {
	return async dispatch => {
		const res = await fetch(`/api/workouts/${userId}`);
		res.data = await res.json();
		if(res.ok) dispatch(getWorkouts(res.data.workouts));
		return res;
	}
}

window.getWorkoutsThunk = getWorkoutsThunk;

//workout reducer
export default function workoutReducer(state={}, action) {
	Object.freeze(state);
	switch(action.type) {
		case GET_WORKOUTS:
			return action.workouts;
		default:
			return state;
	}
}
