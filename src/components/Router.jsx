import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginHome from "./Login/LoginHome";
import Home from "./Home/Home";
import SignUp from "./Login/SignUp";
import SignIn from "./Login/SignIn";
import PwdSerch from "./Login/PwdSerch";
import OrderPlaces from "./Order/OrderPlaces";
import Location from "./Location/Location";
import Menu from "./Order/Menu";
import MenuDetail from "./Order/MenuDetail";
import Payment from "./Order/Payment";
import OrderList from "./Order/OrderList";
import NotFound from "./Error/NotFound";
import OrderItem from "./Home/OrderItem";
import MenuInform from "./Home/MenuInform";

const AppRouter = ({ isLoginState, userObj }) => {
  // console.log(userObj);
  return (
    <Router>
      <Routes>
        {isLoginState ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/orderPlaces"
              element={<OrderPlaces userObj={userObj} />}
            />
            <Route path="/location" element={<Location userObj={userObj} />} />
            <Route
              path="/orderPlaces/menu"
              element={<Menu userObj={userObj} />}
            />
            <Route
              path="/orderPlaces/menu/:itemCode"
              element={<MenuDetail userObj={userObj} />}
            />
            <Route
              path="/orderPlaces/menu/payment"
              element={<Payment userObj={userObj} />}
            />
            <Route
              path="/orderList/:uid"
              element={<OrderList userObj={userObj} />}
            />
            <Route
              path="/orderItem/:uid"
              element={<OrderItem userObj={userObj} />}
            />
            <Route path="/menuInform" element={<MenuInform />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginHome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/pwdserch" element={<PwdSerch />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
