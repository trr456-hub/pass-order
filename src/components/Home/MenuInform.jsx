import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuInform = () => {
  const [hotMenus, setHotMenus] = useState([]);
  const [iceMenus, setIceMenus] = useState([]);
  const [viewMenu, setViewMenu] = useState(true);
  const [selectMenu, setSelectMenu] = useState("hot");

  const navigation = useNavigate();

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

  useEffect(() => {
    const db = getDatabase();
    const hotMenusRef = ref(db, "passOrder/hotProducts");
    const iceMenusRef = ref(db, "passOrder/iceProducts");
    // db호출
    onValue(hotMenusRef, (snapshot) => {
      const data = snapshot.val();
      const hotMenusList = Object.values(data);
      // console.log("따듯한메뉴 : ", hotMenusList);
      setHotMenus(hotMenusList);
    });
    onValue(iceMenusRef, (snapshot) => {
      const data = snapshot.val();
      const iceMenusList = Object.values(data);
      // console.log("아이스메뉴 : ", iceMenusList);
      setIceMenus(iceMenusList);
    });
  }, []);

  return (
    <div className="menuContainer">
      <header className="menuHeader">
        <div
          onClick={() => navigation("/")}
          className="backArrow"
          style={{ fontSize: 20 }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>메뉴소개</span>
      </header>
      <div className="menu">
        <div className="storeComment">
          <span className="comment1">저렴다방</span>
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
                <Link key={menu.itemcode}>
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
                <Link key={menu.itemcode}>
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

export default MenuInform;
