import {graphActionTypes} from './graph'




export default function rawGraphDataReducer( state = {}, action) {
	Object.freeze(state);
	const newState = Object.assign({}, state);
	switch(action.type) {
		case graphActionTypes.SET_RAW_GRAPH_DATA:
			//do a thing

		default:
			return newState;
	}
}
