import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./auth";
import workouts from "./workouts";
import progress from "./progress";
import exercises from "./exercises";
import sets from "./sets";
import graph from "./graph";
import graphData from "./graphData";
import {authActionTypes} from './auth'
//change graph to be about graph settings and user options?
const appReducer = combineReducers({
  auth,
  workouts,
  progress,
  exercises,
  sets,
  graph,
  graphData,
});
// using rootReducer in this manner (returning appReducer) we clear the redux store on logout. See: https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
// answer from Dan Abramov so.... this is the way
const rootReducer = (state, action) => {
	if(action.type === authActionTypes.REMOVE_USER) {
		state = undefined
	}

	return appReducer(state, action)
}

let storeEnhancer;

if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
