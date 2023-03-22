import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Payment = ({ userObj }) => {
  const navigation = useNavigate();
  const location = useLocation();
  console.log(location.state.cartItem);
  console.log(location.state.storeItem);
  return (
    <div>
      <header className="menuHeader">
        <div onClick={() => navigation(-1)} className="backArrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span>결제페이지</span>
      </header>
    </div>
  );
};

export default Payment;
