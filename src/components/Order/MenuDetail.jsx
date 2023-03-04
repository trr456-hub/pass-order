import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS, faM, faL } from "@fortawesome/free-solid-svg-icons";

const MenuDetail = () => {
  const location = useLocation();
  const itemCode = location.state.itemcode;
  // console.log(itemCode);
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
              <p>(-500)</p>
            </button>
            <button>
              <FontAwesomeIcon icon={faM} />
              <p>(+0)</p>
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
          <div>000 원</div>
        </div>
        <div className="detailBtnContainer">
          <button>장바구니</button>
          <button>바로구매</button>
        </div>
      </footer>
    </div>
  );
};

export default MenuDetail;
