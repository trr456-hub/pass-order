import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "fbase";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen, userObj, stamp, coupon }) => {
  const userId = userObj.uid;

  const handleClose = () => {
    setSidebarOpen(false);
  };
  const menuItems = [
    { storeName: "메뉴소개", url: `/menuInform` },
    { storeName: "적립내역", url: `/orderHistory/${userId}` },
    { storeName: "주문", url: `/orderPlaces` },
    { storeName: "주문내역", url: `/orderItem/${userId}` },
    { storeName: "MY메뉴", url: "/myInformation" },
    { storeName: "매장찾기", url: `/location` },
  ];
  const signOut = (e) => {
    if (window.confirm("로그아웃 하겠습니까?")) {
      Auth.signOut();
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="closeBtn">
        <button>
          <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
        </button>
      </div>
      <ul className="menuItem">
        {menuItems.map((menuItem, i) => (
          <Link
            key={i}
            to={menuItem.url}
            state={{ stamp: stamp, coupon: coupon }}
          >
            <li>{menuItem.storeName}</li>
          </Link>
        ))}
      </ul>
      <button className="signOut" onClick={signOut}>
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
