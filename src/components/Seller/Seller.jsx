import { Auth, dbService } from "fbase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Seller = ({ userObj }) => {
  const [storeData, setStoreData] = useState({});
  const [orderData, setOrderData] = useState([]);

  const storeId = storeData.storeId;
  const userId = userObj.uid;

  const signOut = (e) => {
    if (window.confirm("로그아웃 하겠습니까?")) {
      Auth.signOut();
    } else {
      e.preventDefault();
    }
  };
  const getStoreData = useCallback(async () => {
    const q = query(
      collection(dbService, storeId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    // querySnapshot.docs : 모든 querySnapshot을 array로 반환
    const data = querySnapshot.docs.map((doc) => doc.data());
    setOrderData(data);
  }, [storeId]);
  useEffect(() => {
    const setMerchant = async () => {
      const docRef = doc(dbService, "merchants", userId);
      try {
        const docSnap = await getDoc(docRef);
        docSnap.exists()
          ? docSnap.data()
          : await setDoc(docRef, {
              id: userId,
              name: "",
              storeId: "",
            });
        setStoreData(docSnap.data());
      } catch (error) {
        console.log("에러내용 : ", error);
      }
    };
    setMerchant();
    if (storeId) {
      getStoreData();
    }
  }, [userId, storeId, getStoreData]);

  return (
    <div className="sellerContainer">
      <input type="button" value="logout" onClick={signOut} />
      <h1>주문 현황</h1>
      <div className="sellerCategory">
        <span>주문고객</span>
        <span>요청사항</span>
        <span>제품가격</span>
        <span>주문확인여부</span>
        <span>상세정보</span>
      </div>
      {orderData.map((item, i) => (
        <div key={i} className="orderInfo">
          <span>{item.user}</span>
          <span>{item.request}</span>
          <span>{item.total} 원</span>
          <select>
            <option>주문확인중</option>
            <option>픽업준비완료</option>
          </select>
          <span>주문상세</span>
          <div>
            {item.order.map((item, i) => (
              <div key={i}>
                <span>{item.name}</span>
                <span>{item.number}</span>
                <span>{item.price}</span>
                <span>{item.size}</span>
                <span>{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Seller;
