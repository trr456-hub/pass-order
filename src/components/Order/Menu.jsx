import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import Basket from "./Basket";

const Menu = ({ userObj }) => {
  const [hotMenus, setHotMenus] = useState([]);
  const [iceMenus, setIceMenus] = useState([]);
  const [viewMenu, setViewMenu] = useState(true);
  const [selectMenu, setSelectMenu] = useState("hot");
  const [basketOpen, setBasketOpen] = useState(false);

  const location = useLocation();
  const storeNumber = location.state.storeNumber.name;
  const storeItem = location.state.storeNumber;
  const coupon = location.state.coupon;

  /** 메뉴를 카테고리별로 보여주는 함수 */
  const view = (e) => {
    const target = e.target.innerText;
    if (target === "따듯한커피") {
      setViewMenu(true);
      setSelectMenu("hot");
    } else {
      setViewMenu(false);
      setSelectMenu("ice");
    }
  };

  /** 장바구니를 열고닫는 함수 */
  const handleBasketToggle = () => {
    setBasketOpen(!basketOpen);
  };

  useEffect(() => {
    const db = getDatabase();
    const hotMenusRef = ref(db, "passOrder/hotProducts");
    const iceMenusRef = ref(db, "passOrder/iceProducts");
    // db호출
    onValue(hotMenusRef, (snapshot) => {
      const data = snapshot.val();
      const hotMenusList = Object.values(data);
      setHotMenus(hotMenusList);
    });
    onValue(iceMenusRef, (snapshot) => {
      const data = snapshot.val();
      const iceMenusList = Object.values(data);
      setIceMenus(iceMenusList);
    });
  }, []);

  return (
    <div className="menuContainer">
      <header className="menuHeader">
        <span>메뉴선택</span>
        <div className="basketFont" onClick={handleBasketToggle}>
          <FontAwesomeIcon icon={faBasketShopping} />
        </div>
        <Basket
          basketOpen={basketOpen}
          setBasketOpen={setBasketOpen}
          userObj={userObj}
          storeItem={storeItem}
          coupon={coupon}
        />
      </header>
      <div className="menu">
        <div className="storeComment">
          <span className="comment1">{storeNumber}</span>
          <span className="comment2">의 메뉴입니다.</span>
        </div>
        <div className="menusCategorie">
          <span
            className={`ice ${selectMenu === "ice" ? "selected" : ""}`}
            onClick={view}
          >
            따듯한커피
          </span>
          <span
            className={`hot ${selectMenu === "hot" ? "selected" : ""}`}
            onClick={view}
          >
            시원한커피
          </span>
        </div>
        <div className="menus">
          {viewMenu
            ? hotMenus.map((menu) => (
                <Link
                  to={`/orderPlaces/menu/${menu.itemcode}`}
                  state={{
                    itemcode: menu,
                    storeItem: storeItem,
                    coupon: coupon,
                  }}
                  key={menu.itemcode}
                >
                  <img
                    src={menu.img}
                    alt="메뉴이미지"
                    width="140px"
                    height="140px"
                  />
                  <span>{menu.name}</span>
                </Link>
              ))
            : iceMenus.map((menu) => (
                <Link
                  to={`/orderPlaces/menu/${menu.itemcode}`}
                  state={{
                    itemcode: menu,
                    storeItem: storeItem,
                    coupon: coupon,
                  }}
                  key={menu.itemcode}
                >
                  <img
                    src={menu.img}
                    alt="메뉴이미지"
                    width="140px"
                    height="140px"
                  />
                  <span>{menu.name}</span>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
