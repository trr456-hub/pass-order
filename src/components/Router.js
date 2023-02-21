import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";

const AppRouter = ({ isLoginState, userObj }) => {
  return (
    <Router>
      <Routes>
        {isLoginState ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
