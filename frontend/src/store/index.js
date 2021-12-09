import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import eventReducer from "./event";
import sessionReducer from "./session";
import singleEventReducer from "./singleEvent";
import eventUserReducer from "./userEvents";

const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventReducer,
  userEvents: eventUserReducer,
  singleEvent: singleEventReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
