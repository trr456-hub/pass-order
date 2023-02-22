import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginContainer from "./Login/LoginContainer";
import Home from "./Home/Home";
import SignUp from "./Login/SignUp";

const AppRouter = ({ isLoginState, userObj }) => {
  return (
    <Router>
      <Routes>
        {isLoginState ? (
          <Route path="/" element={<Home />} />
        ) : (
          <>
            <Route path="/" element={<LoginContainer />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
