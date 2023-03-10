import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Basket = ({ basketOpen, setBasketOpen, cartItem }) => {
  const handleClose = () => {
    setBasketOpen(false);
  };

  return (
    <div className={`basket ${basketOpen ? "bOpen" : ""}`}>
      <div className="bCloseBtn">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div style={{ color: "black" }}>장바구니</div>
    </div>
  );
};

export default Basket;
