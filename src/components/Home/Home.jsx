import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homeLogo from "assets/homeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMugSaucer,
  faStamp,
  faMapLocation,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar/Sidebar";
import mainImg1 from "assets/main/mainImg1.jpg";
import mainImg2 from "assets/main/mainImg2.jpg";
import mainImg3 from "assets/main/mainImg3.jpg";
import mainImg4 from "assets/main/mainImg4.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dbService } from "fbase";
import {
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useCallback } from "react";

const images = [mainImg1, mainImg2, mainImg3, mainImg4];

const Home = ({ userObj }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stamp, setStamp] = useState(0);
  const [coupon, setCoupon] = useState(0);

  const userId = userObj.uid;

  const menu = [
    { name: "주문", icon: faMugSaucer, url: "/orderPlaces" },
    { name: "적립내역", icon: faStamp, url: `/orderHistory/${userId}` },
    { name: "주문내역", icon: faBagShopping, url: `/orderItem/${userId}` },
    { name: "매장찾기", icon: faMapLocation, url: "/location" },
  ];

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
  const snapshot = useCallback(() => {
    const stampRef = doc(dbService, "Stamp", userId);
    const subStampRef = collection(stampRef, "stamp");
    onSnapshot(doc(subStampRef, "stampAndCoupon"), (doc) => {
      const docData = doc.data();
      setStamp(docData.stamp);
      setCoupon(docData.coupon);
    });
  }, [userId]);
  useEffect(() => {
    const getStamps = async () => {
      const stampRef = doc(dbService, "Stamp", userId);
      const subStampRef = collection(stampRef, "stamp");
      const stampAndCouponRef = doc(subStampRef, "stampAndCoupon");
      const stampSnap = await getDoc(stampAndCouponRef);
      const stampData = stampSnap.data();
      if (stampData.stamp > 9 && stampData.stamp < 20) {
        await updateDoc(stampAndCouponRef, {
          stamp: increment(-10),
          coupon: increment(1),
        });
      } else if (stampData.stamp > 19 && stampData.stamp < 30) {
        await updateDoc(stampAndCouponRef, {
          stamp: increment(-20),
          coupon: increment(2),
        });
      } else if (stampData.stamp > 29 && stampData.stamp < 40) {
        await updateDoc(stampAndCouponRef, {
          stamp: increment(-30),
          coupon: increment(3),
        });
      } else if (stampData.stamp > 39 && stampData.stamp < 50) {
        await updateDoc(stampAndCouponRef, {
          stamp: increment(-40),
          coupon: increment(4),
        });
      } else if (stampData.stamp > 49 && stampData.stamp < 60) {
        await updateDoc(stampAndCouponRef, {
          stamp: increment(-50),
          coupon: increment(5),
        });
      }
    };
    getStamps();
  }, [userId]);
  useEffect(() => {
    snapshot();
  }, [snapshot]);
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
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            userObj={userObj}
          />
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
            <span>내 스탬프 {stamp} / 10</span>
            <div className="coupon">내 쿠폰 {coupon}개</div>
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
