import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Payment = ({ userObj }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const cartItem = location.state.cartItem;
  const storeItem = location.state.storeItem;

  return (
    <div className="paymentContainer">
      <header className="menuHeader">
        <div onClick={() => navigation(-1)} className="backArrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span>결제페이지</span>
      </header>
      <div className="paymentElement">
        <div>{storeItem.name}</div>
        {cartItem.map((item, index) => (
          <div key={index} className="cartArr">
            <img
              src={item.img}
              alt="basketImg"
              style={{ width: 70, height: 70 }}
            />
            <div className="cartElement">
              <div className="pnContainer">
                <h1>{item.name}</h1>
              </div>
              <span>{item.size}</span>
              <span>{item.type}</span>
              <div className="pnContainer">
                <span>{item.price} 원</span>
                <span>{item.number} 잔</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
