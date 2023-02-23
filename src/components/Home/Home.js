import React, { useState } from "react";
import homeLogo from "assets/homeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  console.log("setSidebarOpen", setSidebarOpen);
  console.log("sidebarOpen", sidebarOpen);
  return (
    <div>
      <header className="homeHeader">
        <div>
          <FontAwesomeIcon
            icon={faBars}
            className="headerBars"
            onClick={handleSidebarToggle}
          />
          <div className="logoDiv">
            <img src={homeLogo} alt="홈로고" className="headerLogo" />
          </div>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </header>
    </div>
  );
};

export default Home;
