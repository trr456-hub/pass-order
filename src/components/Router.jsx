import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
// 로그인 컴포넌트
import LoginHome from "./login/LoginHome";
import SignUp from "./login/SignUp";
import SignIn from "./login/SignIn";
import PwdSerch from "./login/PwdSerch";
// 구매관련 컴포넌트
import OrderPlaces from "./order/OrderPlaces";
import Menu from "./order/Menu";
import MenuDetail from "./order/MenuDetail";
import Payment from "./order/Payment";
import OrderList from "./order/OrderList";
// 에러페이지 404
import NotFound from "./error/NotFound";
// 홈 사이드바 컴포넌트
import Location from "./sidebar/Location";
import OrderItem from "./sidebar/OrderItem";
import MenuInform from "./sidebar/MenuInform";
import OrderHistory from "./sidebar/OrderHistory";
import MyInformation from "./sidebar/MyInformation";
// 판매자 컴포넌트
import Seller from "./seller/Seller";

const AppRouter = ({ isLoginState, userObj, sellerState }) => {
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
            <Route
              path="/orderHistory/:uid"
              element={<OrderHistory userObj={userObj} />}
            />
            <Route
              path="/myInformation"
              element={<MyInformation userObj={userObj} />}
            />
          </>
        ) : sellerState ? (
          <Route path="/" element={<Seller userObj={userObj} />} />
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
