import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { collection, query } from "firebase/firestore";
import { dbService } from "fbase";

const Basket = ({ basketOpen, setBasketOpen }) => {
  const handleClose = () => {
    setBasketOpen(false);
  };
  useEffect(() => {
    const q = query(collection(dbService, "Basket"));
    console.log(q);
  }, []);
  return (
    <div className={`basket ${basketOpen ? "bOpen" : ""}`}>
      <div className="bCloseBtn">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div style={{ color: "black" }}>장바구니</div>
      <div>
        {/* {selectedItem.map((item, i) => (
          <div key={i} style={{ color: "black" }}>
            <span>{item.name}</span>
            <h2>{item.price}</h2>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Basket;
