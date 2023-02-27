import React, { useState } from "react";
import { Link } from "react-router-dom";
import homeLogo from "assets/homeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMugSaucer,
  faStamp,
  faUser,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import mainImg1 from "assets/main/mainImg1.jpg";
import mainImg2 from "assets/main/mainImg2.jpg";
import mainImg3 from "assets/main/mainImg3.jpg";
import mainImg4 from "assets/main/mainImg4.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [mainImg1, mainImg2, mainImg3, mainImg4];
const menu = [
  { name: "주문", icon: faMugSaucer, url: "/order" },
  { name: "적립내역", icon: faStamp, url: "/history" },
  { name: "MY메뉴", icon: faUser, url: "/menu" },
  { name: "매장찾기", icon: faMapLocation, url: "/location" },
];

const Home = ({ userObj }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="home">
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
          <Slider {...settings}>
            {images.map((img, i) => (
              <div className="slider" key={i}>
                <img src={img} alt="images" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="mainName">
          <span>{userObj.displayName} 님</span>
          <span>환영합니다.</span>
        </div>
        <div className="informContainer">
          <div className="stamp">
            <span>내 스탬프 0개</span>
            <div className="information">
              {menu.map((item, i) => (
                <Link to={item.url} key={i} className="menuElement">
                  <div className="menuBox">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
