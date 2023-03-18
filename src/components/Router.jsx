import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginHome from "./Login/LoginHome";
import Home from "./Home/Home";
import SignUp from "./Login/SignUp";
import SignIn from "./Login/SignIn";
import PwdSerch from "./Login/PwdSerch";
import Order from "./Order/Order";
import Location from "./Location/Location";
import Menu from "./Order/Menu";
import MenuDetail from "./Order/MenuDetail";

const AppRouter = ({ isLoginState, userObj }) => {
  // console.log(userObj);
  return (
    <Router>
      <Routes>
        {isLoginState ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/order" element={<Order userObj={userObj} />} />
            <Route path="/location" element={<Location userObj={userObj} />} />
            <Route path="/order/menu" element={<Menu userObj={userObj} />} />
            <Route
              path="/order/menu/:itemCode"
              element={<MenuDetail userObj={userObj} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginHome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/pwdserch" element={<PwdSerch />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
