import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "fbase";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleClose = () => {
    setSidebarOpen(false);
  };
  const menuItems = [
    "메뉴소개",
    "적립",
    "주문",
    "주문내역",
    "MY메뉴",
    "매장찾기",
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
        {menuItems.map((menuItem) => (
          <li key={menuItem}>{menuItem}</li>
        ))}
      </ul>
      <button onClick={signOut}>로그아웃</button>
    </div>
  );
};

export default Sidebar;
