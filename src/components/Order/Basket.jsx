import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "fbase";
import { doc, onSnapshot } from "firebase/firestore";

const Basket = ({ basketOpen, setBasketOpen, userObj }) => {
  const [cartItem, setCartItem] = useState([]);

  const userId = userObj.uid;

  const handleClose = () => {
    setBasketOpen(false);
  };
  const dataDelete = (index) => {
    console.log(index);
  };

  useEffect(() => {
    onSnapshot(doc(dbService, "Basket", userId), (doc) => {
      const docData = doc.data();
      const docArr = docData.item;
      setCartItem(docArr);
    });
  }, [userId]);
  return (
    <div className={`basket ${basketOpen ? "bOpen" : ""}`}>
      <div className="bCloseBtn">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div>
        {cartItem.map((item, index) => (
          <div key={index} style={{ color: "black" }}>
            <h1>{item.name}</h1>
            <button onClick={() => dataDelete(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
