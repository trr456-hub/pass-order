import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService } from "fbase";
import { getDatabase, onValue, ref } from "firebase/database";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ userObj }) => {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState({});

  const navigation = useNavigate();
  const userId = userObj.displayName;

  const querySnapshot = useCallback(async () => {
    const storesArr = stores.map((item) => item.number.toString());
    storesArr.map((item) => {
      const q = query(collection(dbService, item), where("user", "==", userId));
      return onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => setStore(doc.data()));
      });
    });
    // // Promise.all() 메서드를 사용해 storeIndex 상점 인덱스에 대한 getDocs 함수 호출의 결과를 기다림
    // const storeCollection = await Promise.all(
    //   storeIndex.map(async (item) => await getDocs(item))
    // );
    // const storeData = storeCollection.map((doc) =>
    //   doc.docs.map((d) => d.data())
    // );
    // const storeSelect = storeData.filter((arr) => arr.length > 0);

    // // 배열에 요소가 있는지 확인
    // if (storeSelect.length > 0) {
    //   const storeItem = storeSelect[0];
    //   setStore(storeItem[0]);
    // }
  }, [stores, userId]);

  useEffect(() => {
    querySnapshot();
  }, [querySnapshot]);

  useEffect(() => {
    const db = getDatabase();
    const storesRef = ref(db, "passOrder/stores");
    //db호출 여 매장정보 프린팅
    onValue(storesRef, (snapshot) => {
      const data = snapshot.val();
      const storesList = Object.values(data);
      setStores(storesList);
    });
  }, []);

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
          {store.store && (
            <>
              <h1>
                매장명<span>{store.store.name}</span>
              </h1>
              <h1>
                매장주소<span>{store.store.address}</span>
              </h1>
            </>
          )}
          <h1>
            수령시간<span>{store.orderCall}</span>
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
            {store.order &&
              store.order.map((item, i) => (
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
            닉네임<span>{store.user}</span>
          </h2>
          <h2>
            요청사항<span>{store.request}</span>
          </h2>
          <h2>
            적립스탬프<span>{store.stamp} 개</span>
          </h2>
          <h2>
            결제금액<span>{store.total} 원</span>
          </h2>
        </div>
        <div className="orderListComent">
          <span>* 새로운 주문 시 마지막 주문내역은 사라집니다. *</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
