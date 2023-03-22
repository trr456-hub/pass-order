import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Payment = ({ userObj }) => {
  const [clicked, setClicked] = useState(false);
  const [sum, setSum] = useState(0);

  const navigation = useNavigate();
  const location = useLocation();
  const cartItem = location.state.cartItem;
  const storeItem = location.state.storeItem;

  const sudanClick = (e) => {
    const btnType = e.target.innerText;
    if (btnType === "카드결제") {
      setClicked("card");
    } else {
      setClicked("kakaopay");
    }
  };
  const totalPrice = useCallback(() => {
    let total = 0;
    cartItem.forEach((e) => (total += e.price));
    setSum(total);
  }, [cartItem]);
  useEffect(() => {
    totalPrice();
  }, [totalPrice]);
  return (
    <div className="paymentContainer">
      <header className="menuHeader">
        <div onClick={() => navigation(-1)} className="backArrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span>결제페이지</span>
      </header>
      <div className="paymentElement">
        <div className="storeTitle">{storeItem.name}</div>
        {cartItem.map((item, index) => (
          <div key={index} className="paymentArr">
            <img
              src={item.img}
              alt="basketImg"
              style={{ width: 70, height: 70 }}
            />
            <div className="paymentInf">
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
      <div className="requestComent">
        <h1>
          요청사항<span> {`(ex. 캐리어 준비해주세요)`}</span>
        </h1>
        <input type="text" placeholder="요청사항이 있으면 적어주세요." />
      </div>
      <div className="sudan">
        <span>결제수단</span>
        <div>
          <h2 onClick={sudanClick} className={clicked === "card" ? "card" : ""}>
            카드결제
          </h2>
          <h2
            onClick={sudanClick}
            className={clicked === "kakaopay" ? "kakaopay" : ""}
          >
            Kakao Pay
          </h2>
        </div>
      </div>
      <div className="pricePayment">
        <div>
          <span>상품금액</span>
          <span>{sum} 원</span>
        </div>
        <div>
          <span>할인금액</span>
          <span>-0 원</span>
        </div>
        <div style={{ paddingBottom: 25, borderBottom: "1px solid lightGray" }}>
          <span>결제금액</span>
          <span style={{ color: "red" }}>{sum} 원</span>
        </div>
        <h1>
          <button>결제 진행</button>
        </h1>
      </div>
    </div>
  );
};

export default Payment;
