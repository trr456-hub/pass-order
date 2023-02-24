import React, { useEffect, useState } from "react";
import homeLogo from "assets/homeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import mainImg1 from "assets/main/mainImg1.jpg";
import mainImg2 from "assets/main/mainImg2.jpg";
import mainImg3 from "assets/main/mainImg3.jpg";
import mainImg4 from "assets/main/mainImg4.jpg";

const images = [mainImg1, mainImg2, mainImg3, mainImg4];

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    // 슬라이더 이동을 위한 타이머 설정
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // 타이머 정리
    return () => clearInterval(timer);
  }, []);
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
      <div className="homeContainer">
        <div className="imgContainer">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, i) => (
              <img key={i} src={img} alt="images" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
