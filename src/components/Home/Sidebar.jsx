import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
    </div>
  );
};

export default Sidebar;
