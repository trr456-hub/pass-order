import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "modules";
import "./scss/normalize.scss";
import "./scss/reset.scss";
import "./scss/Login/LoginContainer.scss";
import "./scss/Login/SignUp.scss";
import "./scss/Home/Home.scss";
import "./scss/Home/Location.scss";
import "./scss/Home/Menu.scss";

const composeEnhancers = composeWithDevTools || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware)
  // other enhancers...
);

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
