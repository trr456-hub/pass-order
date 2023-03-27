import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

const OrderItem = () => {
  const [stores, setStores] = useState([]);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    stores.forEach((item) => {
      setNumbers(item.number);
    });
  }, [stores]);

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
  return <div>오더아이템</div>;
};

export default OrderItem;
