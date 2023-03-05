import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS, faM, faL } from "@fortawesome/free-solid-svg-icons";

const MenuDetail = () => {
  const [small, setSmall] = useState(0);
  const location = useLocation();
  const itemCode = location.state.itemcode;
  // console.log(itemCode);
  useEffect(() => {
    let price = itemCode.price;
    if (price >= 2000 && price < 3000) {
      const s = price - 300;
      setSmall(s);
    }
  }, []);
  return (
    <div className="menuContainer">
      <header className="menuHeader">{itemCode.name}</header>
      <div className="menuDetail">
        <img
          src={itemCode.img}
          alt="menuImg"
          style={{ width: 300, height: 300 }}
        />
        <div className="sizeContainer">
          <span>SIZE</span>
          <div className="sizeBtnContainer">
            <button>
              <FontAwesomeIcon icon={faS} />
              <p>{small}</p>
            </button>
            <button>
              <FontAwesomeIcon icon={faM} />
              <p>{itemCode.price}</p>
            </button>
            <button>
              <FontAwesomeIcon icon={faL} />
              <p>(+1000)</p>
            </button>
          </div>
        </div>
      </div>
      <footer className="menuFooter">
        <div className="footerPrice">
          <div>주문금액</div>
          <div>0 원</div>
        </div>
        <div className="detailBtnContainer">
          <button>장바구니 담기</button>
          <button>바로 주문</button>
        </div>
      </footer>
    </div>
  );
};

export default MenuDetail;
