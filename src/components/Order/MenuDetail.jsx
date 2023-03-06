import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faS,
  faM,
  faL,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const MenuDetail = () => {
  /** sizeSmall에 state를 담아주는 hook */
  const [small, setSmall] = useState(0);
  /** sizeLarge에 state를 담아주는 hook */
  const [large, setLarge] = useState(0);
  const [number, setNumber] = useState(0);
  const location = useLocation();
  const itemCode = location.state.itemcode;
  // console.log(itemCode);

  const sizeClick = (e) => {
    // if (e.target.tagName !== "BUTTON") {
    //   return;
    // }
    const btnType = e.target.getAttribute("data-type");
    let price = itemCode.price;
    if (btnType === "small") {
      price = small;
    } else if (btnType === "midium") {
      price = itemCode.price;
    } else if (btnType === "large") {
      price = large;
    }
    console.log(price);
  };

  const numberClick = (e) => {
    console.log(e);
  };
  useEffect(() => {
    /** size small 의 가격을 정의 해주는 함수 */
    const smallPrice = () => {
      const price = itemCode.price;
      if (price < 2000) {
        setSmall(price - 300);
      } else if (price >= 2000 && price < 3000) {
        setSmall(price - 400);
      } else if (price > 3000) {
        setSmall(price - 500);
      }
    };
    /** size large 의 가격을 정의 해주는 함수 */
    const largePrice = () => {
      const price = itemCode.price;
      setLarge(price + 1000);
    };
    largePrice();
    smallPrice();
  }, [itemCode.price]);
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
            <button onClick={sizeClick} data-type="small">
              <FontAwesomeIcon icon={faS} data-type="small" />
              <p data-type="small">{small}원</p>
            </button>
            <button onClick={sizeClick} data-type="midium">
              <FontAwesomeIcon icon={faM} data-type="midium" />
              <p data-type="midium">{itemCode.price}원</p>
            </button>
            <button onClick={sizeClick} data-type="large">
              <FontAwesomeIcon icon={faL} data-type="large" />
              <p data-type="large">{large}원</p>
            </button>
          </div>
        </div>
        <div className="menuNumber">
          <span>수량</span>
          <div>
            <button onClick={numberClick}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span></span>
            <button onClick={numberClick}>
              <FontAwesomeIcon icon={faPlus} />
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
