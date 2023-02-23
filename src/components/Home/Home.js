import React, { useState } from "react";
import homeLogo from "assets/homeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div>
      <header className="homeHeader">
        <div>
          <FontAwesomeIcon
            icon={faBars}
            className="headerBars"
            onClick={handleSidebar}
          />
          <div className="logoDiv">
            <img src={homeLogo} alt="홈로고" className="headerLogo" />
          </div>
          {sidebar && <Sidebar setSidebar={setSidebar} />}
        </div>
      </header>
    </div>
  );
};

export default Home;
