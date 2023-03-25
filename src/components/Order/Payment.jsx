import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "fbase";

const Payment = ({ userObj }) => {
  const [clicked, setClicked] = useState(false);
  const [sum, setSum] = useState(0);
  const [stamps, setStamps] = useState(0);
  const [request, setRequest] = useState("");
  const [paymentObj, setPaymentObj] = useState({});

  const navigation = useNavigate();
  const location = useLocation();
  const cartItem = location.state.cartItem;
  const storeItem = location.state.storeItem;
  const storeNumber = storeItem.number.toString();
  const userId = userObj.uid;

  /** 요청사항을 넘겨주는 함수 */
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setRequest(value);
  };

  /** 토탈 가격을 구해주는 함수 */
  const totalPrice = useCallback(() => {
    let total = 0;
    cartItem.forEach((e) => (total += e.price));
    setSum(total);
  }, [cartItem]);

  /** 스탬프의 개수를 정해주는 함수 */
  const totalStamps = useCallback(() => {
    let stamps = 0;
    cartItem.forEach((e) => (stamps += e.number));
    setStamps(stamps);
  }, [cartItem]);
  /** 결제수단 구분해주는 함수 */
  const sudanClick = (e) => {
    const btnType = e.target.innerText;
    if (btnType === "카드결제") {
      setClicked("card");
    } else if (btnType === "Kakao Pay") {
      setClicked("kakaopay");
    } else {
      setClicked("test");
    }
  };

  /** test 결제 버튼이 눌렸을때 실행되는 함수 */
  const handleTestPayment = async () => {
    const docRef = doc(dbService, storeNumber, userId);
    try {
      await setDoc(docRef, {
        user: userObj.displayName,
        store: storeItem,
        order: cartItem,
        total: sum,
        stamp: stamps,
        request: request,
      });
      console.log("결제완료");
    } catch (error) {
      console.log("에러 : ", error);
    }
  };
  useEffect(async () => {
    const docRef = doc(dbService, storeNumber, userId);
    const docSanp = await getDoc(docRef);
    const docData = docSanp.data();
    setPaymentObj(docData);
    console.log(paymentObj);
  }, [storeNumber, userId]);
  useEffect(() => {
    totalPrice();
    totalStamps();
  }, [totalPrice, totalStamps]);
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
        <input
          onChange={onChange}
          type="text"
          placeholder="요청사항이 있으면 적어주세요."
        />
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
          <h2 onClick={sudanClick} className={clicked === "test" ? "test" : ""}>
            TEST결제
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
          {clicked === "card" ? (
            <button>카드결제</button>
          ) : clicked === "kakaopay" ? (
            <button>카카오페이</button>
          ) : clicked === "test" ? (
            <Link
              to={`/orderList/${userObj.uid}`}
              state={{ paymentObj: paymentObj }}
            >
              <button onClick={handleTestPayment}>TEST결제</button>
            </Link>
          ) : (
            <button onClick={() => alert("결제수단을 골라주세요.")}>
              결제진행
            </button>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Payment;
