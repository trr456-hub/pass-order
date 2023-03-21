import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "fbase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

const Basket = ({ basketOpen, setBasketOpen, userObj, storeItem }) => {
  const [init, setInit] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  const userId = userObj.uid;

  const handleClose = () => {
    setBasketOpen(false);
  };
  const dataDelete = async (index) => {
    const cartRef = doc(dbService, "Basket", userId);
    const cartSnap = await getDoc(cartRef);
    const cartData = cartSnap.data();
    // filter 메소드는 제공된 조건의 포함하는 배열을 만들기때문에
    // fireStore 의 'item' 배열에서 유지할 항목과 제거할 항목을 결정하는 데 암시적 사용
    const newCartItems = cartData.item.filter((item, i) => i !== index);
    await setDoc(cartRef, { item: newCartItems });
    alert("삭제완료!");
  };

  useEffect(() => {
    onSnapshot(doc(dbService, "Basket", userId), (doc) => {
      const docData = doc.data();
      const docArr = docData.item;
      setCartItem(docArr);
      setInit(true);
    });
  }, [userId]);
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
          <div>장바구니가 비어있다룽..</div>
        )}
      </div>
    </div>
  );
};

export default Basket;
