import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ setSidebar }) => {
  const handleClose = () => {
    setSidebar(false);
  };
  return (
    <div className="sidebar">
      <button>
        <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
      </button>
    </div>
  );
};

export default Sidebar;
