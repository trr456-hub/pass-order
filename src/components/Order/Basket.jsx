import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "fbase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Basket = ({ basketOpen, setBasketOpen, userObj, storeItem }) => {
  const [init, setInit] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [sum, setSum] = useState(0);

  const userId = userObj.uid;

  const handleClose = () => {
    setBasketOpen(false);
  };

  /** 장바구니의 item 을 삭제하는 함수 */
  const dataDelete = async (index) => {
    const cartRef = doc(dbService, "Basket", userId);
    const cartSnap = await getDoc(cartRef);
    const cartData = cartSnap.data();
    if (window.confirm("상품을 삭제 하시겠습니까?")) {
      // filter 메소드는 제공된 조건의 포함하는 배열을 만들기때문에
      // fireStore 의 'item' 배열에서 유지할 항목과 제거할 항목을 결정하는 데 암시적 사용
      const newCartItems = cartData.item.filter((item, i) => i !== index);
      await setDoc(cartRef, { item: newCartItems });
      alert("삭제완료!");
    }
  };
  /** 장바구니의 모든 가격을 구하는 함수 useCallback 을 사용해 re-render 방지 */
  const totalPrice = useCallback(() => {
    let total = 0;
    cartItem.forEach((e) => (total += e.price));
    setSum(total);
  }, [cartItem]);
  /** payment 컴포넌트로 이동하는지 묻는 함수 */
  const paymentMove = (e) => {
    if (window.confirm("결제페이지로 이동합니다.")) {
      return;
    } else {
      e.preventDefault();
    }
  };
  useEffect(() => {
    onSnapshot(doc(dbService, "Basket", userId), (doc) => {
      const docData = doc.data();
      if (docData) {
        const docArr = docData.item;
        setCartItem(docArr);
        setInit(true);
      } else {
        setInit(false);
      }
    });
  }, [userId]);
  useEffect(() => {
    totalPrice();
  }, [totalPrice]);
  return (
    <div className={`basket ${basketOpen ? "bOpen" : ""}`}>
      <div className="bCloseBtn">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="bStoreName">{storeItem.name}</div>
      <div className="cartItems">
        {init ? (
          cartItem.map((item, index) => (
            <div key={index} className="cartArr">
              <img
                src={item.img}
                alt="basketImg"
                style={{ width: 70, height: 70 }}
              />
              <div className="cartElement">
                <div className="pnContainer">
                  <h1>{item.name}</h1>
                  <button onClick={() => dataDelete(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <span>{item.size}</span>
                <span>{item.type}</span>
                <div className="pnContainer">
                  <span>{item.price} 원</span>
                  <span>{item.number} 잔</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="basketNull">장바구니가 비어있습니다.</div>
        )}
      </div>
      <div className="bOrderTab">
        <div>
          <h2>상품금액</h2>
          <span>{sum} 원</span>
        </div>
        <Link
          to={`/orderPlaces/menu/payment`}
          state={{ cartItem: cartItem, storeItem: storeItem }}
        >
          <button onClick={paymentMove}>주문하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Basket;
