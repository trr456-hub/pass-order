import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Basket = ({ basketOpen, setBasketOpen, selectedItem }) => {
  const handleClose = () => {
    setBasketOpen(false);
  };
  console.log(selectedItem);
  return (
    <div className={`basket ${basketOpen ? "bOpen" : ""}`}>
      <div className="bCloseBtn">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div style={{ color: "black" }}>장바구니</div>
      <div>
        {selectedItem.map((item, i) => (
          <div key={i} style={{ color: "black" }}>
            <span>{item.name}</span>
            <h2>{item.price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
