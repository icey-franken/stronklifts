//action types
const SET_WORKOUTS = '/workout/SET_WORKOUTS'


//action pojo creator function
export const setWorkouts = (workouts) => ({type: SET_WORKOUTS, workouts});




//thunk action creator
export const getWorkouts = (userId) => {
	return async dispatch => {
		const res = await fetch(`/api/workouts/${userId}`);
		res.data = await res.json();
		if(res.ok) dispatch(setWorkouts(res.data.workouts));
		return res;
	}
}

window.getWorkouts = getWorkouts;

//workout reducer
export default function workoutReducer(state={}, action) {
	Object.freeze(state);
	switch(action.type) {
		case SET_WORKOUTS:
			return action.workouts;
		default:
			return state;
	}
}
