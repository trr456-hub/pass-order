import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import loginReducer from "./Login/LoginHome";

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
