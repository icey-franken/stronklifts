
//action types
const GET_PROGRESS = '/progress/GET_PROGRESS';

//action pojo creator function
export const getProgress = (progress) => ({type: GET_PROGRESS,progress});

//thunk action creator
export const getProgressThunk = (userId) => {
	return async (dispatch) => {
		const res = await fetch(`api/workouts/progress/${userId}`);
		res.data = await res.json()
		if(res.ok) dispatch(getProgress(res.data.progress));
		return res;
	};
};


//reducer
export default function progressReducer(state={}, action) {
	switch(action.type) {
		case GET_PROGRESS:
			return action.progress;
		default:
			return state;
	}
}
