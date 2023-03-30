import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService } from "fbase";
import {
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderList = ({ userObj }) => {
  const [paymentObj, setPaymentObj] = useState({});

  const navigation = useNavigate();
  const location = useLocation();
  const storeItem = location.state.storeItem;
  const storeNumber = storeItem.number.toString();
  const userId = userObj.uid;

  /** setDoc의 값을 다시한번읽어서 setPaymentObj state 에 담아준다 */
  useEffect(() => {
    onSnapshot(doc(dbService, storeNumber, userId), (doc) => {
      const docData = doc.data();
      setPaymentObj(docData);
    });
  }, [storeNumber, userId]);
  return (
    <div className="orderListContainer">
      <header className="menuHeader">
        <div
          onClick={() => navigation("/")}
          className="backArrow"
          style={{ fontSize: 20 }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>주문내역</span>
      </header>
      <div className="orderListElement">
        <div className="orderListStore">
          <span>매장정보</span>
          {paymentObj && paymentObj.store && (
            <>
              <h1>
                매장명<span>{paymentObj.store.name}</span>
              </h1>
              <h1>
                매장주소<span>{paymentObj.store.address}</span>
              </h1>
            </>
          )}
          <h1>
            수령시간<span>준비완료 후 수령 가능</span>
          </h1>
        </div>
        <div className="orderItem">
          <span>주문내역</span>
          <div className="orderitemElement">
            <div>
              <span>품명</span>
              <span>사이즈</span>
              <span>타입</span>
              <span>수량</span>
              <span>합계</span>
            </div>
            {paymentObj &&
              paymentObj.order &&
              paymentObj.order.map((item, i) => (
                <div key={i}>
                  <span>{item.name}</span>
                  <span>{item.size}</span>
                  <span>{item.type}</span>
                  <span>{item.number}</span>
                  <span>{item.price} 원</span>
                </div>
              ))}
          </div>
        </div>
        <div className="orderListInform">
          <span>주문정보</span>
          <h2>
            닉네임<span>{paymentObj && paymentObj.user}</span>
          </h2>
          <h2>
            요청사항<span>{paymentObj && paymentObj.request}</span>
          </h2>
          <h2>
            적립스탬프<span>{paymentObj && paymentObj.stamp} 개</span>
          </h2>
          <h2>
            결제금액<span>{paymentObj && paymentObj.total} 원</span>
          </h2>
        </div>
        <div className="orderListComent">
          <span>* 새로운 주문 시 마지막 주문내역은 사라집니다. *</span>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
