import { dbService } from "fbase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const OrderList = ({ userObj }) => {
  const [paymentObj, setPaymentObj] = useState({});

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
  return <div className="orderListContainer">방가</div>;
};

export default OrderList;
