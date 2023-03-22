import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./scss/normalize.scss";
import "./scss/reset.scss";
import "./scss/Login/LoginContainer.scss";
import "./scss/Login/SignUp.scss";
import "./scss/Home/Home.scss";
import "./scss/Location/Location.scss";
import "./scss/Order/Menu.scss";
import "./scss/Order/Basket.scss";
import "./scss/Order/Payment.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
