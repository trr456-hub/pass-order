import { Auth, dbService } from "fbase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SellerSidebar from "./SellerSidebar";

const Seller = ({ userObj }) => {
  const [storeData, setStoreData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [sellerOpen, setSellerOpen] = useState(false);
  const [sidebarData, setSidebarData] = useState({});

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

  const handleSellerToggle = (i) => {
    setSidebarData(orderData[i]);
    setSellerOpen(!sellerOpen);
  };

  const changeValue = async (e, i) => {
    const {
      target: { value },
    } = e;
    const userCode = orderData[i].creatorId;
    const q = query(collection(dbService, storeId));
    const storeDoc = doc(q, userCode);
    await updateDoc(storeDoc, {
      orderCall: value,
    });
  };
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
          <select onChange={(e) => changeValue(e, i)}>
            <option value={`준비완료 후 수령 가능`}>
              준비완료 후 수령 가능
            </option>
            <option value={`픽업준비완료`}>픽업준비 완료</option>
          </select>
          <span onClick={() => handleSellerToggle(i)}>주문상세</span>
        </div>
      ))}
      <SellerSidebar
        sellerOpen={sellerOpen}
        setSellerOpen={setSellerOpen}
        sidebarData={sidebarData}
      />
    </div>
  );
};

export default Seller;
