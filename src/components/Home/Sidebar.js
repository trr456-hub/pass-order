import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleClose = () => {
    setSidebarOpen(false);
  };
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <button className="closeBtn">
        <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
      </button>
      <ul>
        <li>menu item1</li>
        <li>menu item2</li>
        <li>menu item3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
