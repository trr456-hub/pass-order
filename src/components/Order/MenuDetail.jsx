import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faS,
  faM,
  faL,
  faPlus,
  faMinus,
  faBasketShopping,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Basket from "./Basket";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "fbase";

const MenuDetail = ({ userObj }) => {
  /** sizeSmall에 state를 담아주는 hook */
  const [small, setSmall] = useState(0);
  const [midium, setMidium] = useState(0);
  const [large, setLarge] = useState(0);
  const [number, setNumber] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [basketOpen, setBasketOpen] = useState(false);

  const location = useLocation();
  const itemCode = location.state.itemcode;
  const storeItem = location.state.storeItem;
  const coupon = location.state.coupon;
  const navigation = useNavigate();
  const userId = userObj.uid;

  const newItem = {
    name: itemCode.name,
    type: itemCode.type,
    price: total,
    size: clicked,
    number: number,
    img: itemCode.img,
  };

  /** arrayobject 를 basket 컴포넌트로 넘겨주는 함수 */
  const handleAddBasket = async () => {
    const docRef = doc(dbService, "Basket", userId);
    if (price !== 0) {
      try {
        const docSnap = await getDoc(docRef);
        /** getDoc 함수를 이용하여 이전의 장바구니 아이템을 불러오고 prevItem변수에 저장
         * exists() 를 이용해서 문서가 존재하는지 확인한 후 문서가 존재하면 true를 반환하고
         * 그렇지않으면 false를 반환함
         */
        const prevItems = docSnap.exists() ? docSnap.data().item : [];
        const newItems = [...prevItems, newItem];
        await setDoc(docRef, {
          item: newItems,
        });
        alert("장바구니 추가 완료");
      } catch (error) {
        console.log("에러내용 : ", error);
      }
    } else {
      alert("사이즈를 선택해 주세요");
    }
  };

  /** 커피의 사이즈를 정해주는 함수 */
  const sizeClick = (e) => {
    const btnType = e.target.getAttribute("data-type");
    /** fontAwesome 은 컴포넌트이며 data-type을 가질수없으므로 부모요소인 button에 data-type을 가지고온다 */
    const fontType = e.target.parentNode.getAttribute("data-type");
    let price = itemCode.price;
    if (btnType === "small" || fontType === "small") {
      price = small;
      setClicked("S"); // click state를 변경
    } else if (btnType === "midium" || fontType === "midium") {
      price = midium;
      setClicked("M");
    } else if (btnType === "large" || fontType === "large") {
      price = large; //eslint-disable-line no-unused-vars
      setClicked("L");
    }
    setPrice(price);
  };

  /** 커피의 수량을 정해주는 함수 */
  const numberClick = (e) => {
    const btnType = e.target.getAttribute("data-type");
    const fontType = e.target.parentNode.getAttribute("data-type");
    if (btnType === "plus" || fontType === "plus") {
      if (number < 9) {
        setNumber((prevNumber) => prevNumber + 1);
      } else {
        alert("최대수량은 9잔 입니다.");
        return false;
      }
    } else if (btnType === "minus" || fontType === "minus") {
      if (number > 1) {
        setNumber((prevNumber) => prevNumber - 1);
      } else {
        alert("최소수량은 한잔 입니다.");
        return false;
      }
    }
  };

  /** 장바구니 open 함수 */
  const handleBasketToggle = () => {
    setBasketOpen(!basketOpen);
  };

  /** size에 data 가 false일때 실행되는 함수 */
  const paymentCheck = (e) => {
    if (clicked === false) {
      alert("사이즈를 선택해 주세요");
      e.preventDefault();
    } else {
      alert("구매창으로 이동합니다.");
    }
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
    const midiumPrice = () => {
      const price = itemCode.price;
      setMidium(price);
    };
    /** size large 의 가격을 정의 해주는 함수 */
    const largePrice = () => {
      const price = itemCode.price;
      setLarge(price + 1000);
    };
    const totalPrice = () => {
      const totalPrice = price * number;
      setTotal(totalPrice);
    };

    largePrice();
    midiumPrice();
    smallPrice();
    totalPrice();
  }, [itemCode.price, number, price, userObj]);
  const sizeItem = [
    {
      type: "small",
      sclicked: "S",
      clicked: "clicked",
      icon: faS,
      price: small,
    },
  ];
  console.log(sizeItem);
  return (
    <div className="menuContainer">
      <header className="menuHeader">
        <div onClick={() => navigation(-1)} className="backArrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span>{itemCode.name}</span>
        <div className="basketFont" onClick={handleBasketToggle}>
          <FontAwesomeIcon icon={faBasketShopping} />
        </div>
      </header>
      <div className="menuDetail">
        <img
          src={itemCode.img}
          alt="menuImg"
          style={{ width: 300, height: 300 }}
        />
        <div className="sizeContainer">
          <span>SIZE</span>
          <div className="sizeBtnContainer">
            <button
              onClick={sizeClick}
              data-type="small"
              className={clicked === "S" ? "clicked" : ""}
            >
              <FontAwesomeIcon icon={faS} data-type="small" />
              <p data-type="small">{small}원</p>
            </button>
            <button
              onClick={sizeClick}
              data-type="midium"
              className={clicked === "M" ? "clicked" : ""}
            >
              <FontAwesomeIcon icon={faM} data-type="midium" />
              <p data-type="midium">{midium}원</p>
            </button>
            <button
              onClick={sizeClick}
              data-type="large"
              className={clicked === "L" ? "clicked" : ""}
            >
              <FontAwesomeIcon icon={faL} data-type="large" />
              <p data-type="large">{large}원</p>
            </button>
          </div>
        </div>
        <div className="menuNumber">
          <span>수량</span>
          <div>
            <button onClick={numberClick} data-type="minus">
              <FontAwesomeIcon icon={faMinus} data-type="minus" />
            </button>
            <span>{number}</span>
            <button onClick={numberClick} data-type="plus">
              <FontAwesomeIcon icon={faPlus} data-type="plus" />
            </button>
          </div>
        </div>
      </div>
      <footer className="menuFooter">
        <div className="footerPrice">
          <div>주문금액</div>
          <div>{total} 원</div>
        </div>
        <div className="detailBtnContainer">
          <button onClick={handleAddBasket}>장바구니 담기</button>
          <Link
            onClick={paymentCheck}
            to={`/orderPlaces/menu/payment`}
            state={{
              cartItem: [newItem],
              storeItem: storeItem,
              coupon: coupon,
            }}
          >
            바로 주문
          </Link>
        </div>
      </footer>
      <Basket
        basketOpen={basketOpen}
        setBasketOpen={setBasketOpen}
        userObj={userObj}
        storeItem={storeItem}
        coupon={coupon}
      />
    </div>
  );
};

export default MenuDetail;
