import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService } from "fbase";
import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = ({ userObj }) => {
  const [recordItem, setRecordItem] = useState([]);

  const navigation = useNavigate();
  const userId = userObj.uid;

  useEffect(() => {
    const getStampRecord = async () => {
      const stampRef = doc(dbService, "Stamp", userId);
      const subStampRef = collection(stampRef, "stamp");
      const stampRecords = doc(subStampRef, "stampRecord");
      const stampSnap = await getDoc(stampRecords);
      const recordData = stampSnap.data();
      const recordArr = recordData.recordItem;
      setRecordItem(recordArr.reverse());
    };
    getStampRecord();
  }, [userId]);
  return (
    <div className="orderHistoryContainer">
      <header className="orderHistoryHeader">
        <div
          onClick={() => navigation("/")}
          className="backArrow"
          style={{ fontSize: 20 }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>적립내역</span>
      </header>
      <div className="orderHistory">
        <div className="orderHistory-category">
          <span>구매지점</span>
          <span>날짜</span>
          <span>시간</span>
          <span>적립스탬프</span>
        </div>
        {recordItem.map((item, i) => (
          <div key={i} className="orderHistory-item">
            <span>{item.store}</span>
            <span>{item.date}</span>
            <span>{item.time}</span>
            <span>{item.stamp}개</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
