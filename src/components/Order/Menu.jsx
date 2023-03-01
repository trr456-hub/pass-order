import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const [hotMenus, setHotMenus] = useState([]);
  const [iceMenus, setIceMenus] = useState([]);

  const location = useLocation();
  const storeNumber = location.state.storeNumber.name;

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
      <header className="menuHeader">메뉴선택</header>
      <div className="menu">
        <div className="storeComment">
          <span className="comment1">{storeNumber}</span>
          <span className="comment2">의 메뉴입니다.</span>
        </div>
        <div className="menus">
          {hotMenus.map((menu) => (
            <div key={menu.itemcode}>
              <img
                src={menu.img}
                alt="메뉴이미지"
                width="140px"
                height="140px"
              />
              <span>{menu.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
