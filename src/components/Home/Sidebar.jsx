import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "fbase";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen, userObj }) => {
  const userId = userObj.uid;

  const handleClose = () => {
    setSidebarOpen(false);
  };
  const menuItems = [
    { storeName: "메뉴소개", url: "" },
    { storeName: "적립내역", url: "" },
    { storeName: "주문", url: "" },
    { storeName: "주문내역", url: `/orderItem/${userId}` },
    { storeName: "MY메뉴", url: "" },
    { storeName: "매장찾기", url: "" },
  ];
  const signOut = () => {
    Auth.signOut();
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
          <Link key={i} to={menuItem.url}>
            <li>{menuItem.storeName}</li>
          </Link>
        ))}
      </ul>
      <button onClick={signOut}>로그아웃</button>
    </div>
  );
};

export default Sidebar;
