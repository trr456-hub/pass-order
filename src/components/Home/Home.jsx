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
import Sidebar from "../sidebar/Sidebar";
import mainImg1 from "assets/img/mainImg1.jpg";
import mainImg2 from "assets/img/mainImg2.jpg";
import mainImg3 from "assets/img/mainImg3.jpg";
import mainImg4 from "assets/img/mainImg4.jpg";
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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCallback } from "react";

const images = [mainImg1, mainImg2, mainImg3, mainImg4];

const Home = ({ userObj }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stamp, setStamp] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const userId = userObj.uid;

  const menuName = ["주문", "적립내역", "주문내역", "매장찾기"];
  const icons = [faMugSaucer, faStamp, faBagShopping, faMapLocation];
  const urls = [
    `/orderPlaces`,
    `/orderHistory/${userId}`,
    `/orderItem/${userId}`,
    "/location",
  ];
  const states = [{ coupon: coupon }, {}, {}, {}];
  const menu = menuName.map((item, i) => ({
    name: item,
    icon: icons[i],
    url: urls[i],
    state: states[i],
  }));

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
    const stampAndCouponMapping = {
      10: { stamp: 9, endStamp: 20, coupon: 1, minorStamp: 10 },
      20: { stamp: 19, endStamp: 30, coupon: 2, minorStamp: 20 },
      30: { stamp: 29, endStamp: 40, coupon: 3, minorStamp: 30 },
      40: { stamp: 39, endStamp: 50, coupon: 4, minorStamp: 40 },
      50: { stamp: 49, endStamp: 60, coupon: 5, minorStamp: 50 },
    };
    const getStamps = async () => {
      const stampRef = doc(dbService, "Stamp", userId);
      const subStampRef = collection(stampRef, "stamp");
      const stampAndCouponRef = doc(subStampRef, "stampAndCoupon");
      const stampAndCouponSnap = await getDoc(stampAndCouponRef);
      const stampAndCouponData = stampAndCouponSnap.exists()
        ? stampAndCouponSnap.data()
        : null;
      if (stampAndCouponData === null) {
        await setDoc(stampAndCouponRef, {
          stamp: 0,
          coupon: 0,
        });
      }
      for (let key in stampAndCouponMapping) {
        const stamp = stampAndCouponMapping[key].stamp;
        const endStamp = stampAndCouponMapping[key].endStamp;
        if (
          stampAndCouponData.stamp > stamp &&
          stampAndCouponData.stamp < endStamp
        ) {
          await updateDoc(stampAndCouponRef, {
            stamp: increment(-stampAndCouponMapping[key].minorStamp),
            coupon: increment(stampAndCouponMapping[key].coupon),
          });
          break;
        }
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
            stamp={stamp}
            coupon={coupon}
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
            <span>스탬프 {stamp}/10개</span>
            <div className="coupon">마이쿠폰 {coupon}개</div>
            <div className="information">
              {menu.map((item, i) => (
                <Link
                  to={item.url}
                  key={i}
                  className="menuElement"
                  state={item.state}
                >
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
