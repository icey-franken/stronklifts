import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./auth";
import workouts from "./workouts";
import progress from "./progress";
import exercises from "./exercises";
import sets from "./sets";
import graph from "./graph";
import graphData from "./graphData";

//change graph to be about graph settings and user options?
const rootReducer = combineReducers({
  auth,
  workouts,
  progress,
  exercises,
  sets,
  graph,
  graphData,
});

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
