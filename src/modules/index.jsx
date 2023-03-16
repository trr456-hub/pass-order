import { combineReducers } from "redux";
import loginReducer from "./Login/LoginHome";

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
