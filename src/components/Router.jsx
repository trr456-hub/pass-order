import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Home/Home";
// 로그인 컴포넌트
import LoginHome from "./Login/LoginHome";
import SignUp from "./Login/SignUp";
import SignIn from "./Login/SignIn";
import PwdSerch from "./Login/PwdSerch";
// 구매관련 컴포넌트
import OrderPlaces from "./Order/OrderPlaces";
import Menu from "./Order/Menu";
import MenuDetail from "./Order/MenuDetail";
import Payment from "./Order/Payment";
import OrderList from "./Order/OrderList";
// 에러페이지 404
import NotFound from "./Error/NotFound";
// 홈 사이드바 컴포넌트
import Location from "./Sidebar/Location";
import OrderItem from "./Sidebar/OrderItem";
import MenuInform from "./Sidebar/MenuInform";
import OrderHistory from "./Sidebar/OrderHistory";
import MyInformation from "./Sidebar/MyInformation";
// 판매자 컴포넌트
import Seller from "./Seller/Seller";

const AppRouter = ({ isLoginState, userObj, sellerState }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <Routes>
          {isLoginState ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/orderPlaces"
                element={<OrderPlaces userObj={userObj} />}
              />
              <Route
                path="/location"
                element={<Location userObj={userObj} />}
              />
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
    </BrowserRouter>
  );
};

export default AppRouter;
