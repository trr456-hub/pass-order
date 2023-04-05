import {
  faChevronRight,
  faHome,
  faStamp,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import coffee from "assets/coffee.png";
import { Auth } from "fbase";

const MyInformation = ({ userObj }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const coupon = location.state.coupon;
  const stamp = location.state.stamp;
  const userId = userObj.uid;

  const navi = [
    { name: "개인정보 변경", url: "" },
    { name: "스탬프 적립 내역", url: `/orderHistory/${userId}` },
    { name: "주문현황", url: `/orderItem/${userId}` },
    { name: "주문하러가기", url: "/orderPlaces" },
  ];

  const signOut = (e) => {
    if (window.confirm("로그아웃 하겠습니까?")) {
      Auth.signOut();
      navigation("/");
    } else {
      e.preventDefault();
    }
  };
  return (
    <div className="myInformation">
      <header className="myInformHeader">
        <div
          onClick={() => navigation("/")}
          className="backArrow"
          style={{ fontSize: 20 }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>마이페이지</span>
      </header>
      <div className="myInformContainer">
        <div className="myInformTop">
          <img src={coffee} alt="img" />
          <h3>안녕하세요!</h3>
          <h2>
            {userObj.displayName} <span>님</span>
          </h2>
        </div>
        <div className="myInformMiddle">
          <div>
            <FontAwesomeIcon icon={faStamp} />
            <h2>
              스탬프
              <h3>{stamp}/10개</h3>
            </h2>
          </div>
          <div>
            <FontAwesomeIcon icon={faTicket} />
            <h2>
              마이쿠폰
              <h3>{coupon}개</h3>
            </h2>
          </div>
        </div>
        <div className="myInformBottom">
          {navi.map((item, i) => (
            <div key={i}>
              <Link to={item.url}>
                <h1>{item.name}</h1>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>
          ))}
          <button onClick={signOut} className="myInformLogout">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyInformation;
