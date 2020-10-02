const SET_RAW_GRAPH_DATA = 'graph/SET_GRAPH_DATA';

const setRawGraphData = (rawGraphData) =>({
type: SET_RAW_GRAPH_DATA,
rawGraphData,
})

export const graphActions = {setRawGraphData};

export default function graphReducer(state={}, action) {
	Object.freeze(state);
	let newState = Object.assign({},state);
	switch(action.type) {
		case SET_RAW_GRAPH_DATA:
			const workoutDataIds = Object.keys(action.rawGraphData);
			workoutDataIds.forEach(id=>{
				newState[id] = action.rawGraphData[id];
			})
			return newState;
		default:
			return state;
	}
}
