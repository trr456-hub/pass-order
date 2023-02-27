import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";

const Order = ({ userObj }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const storesRef = ref(db, "passOrder/stores");
    //db호출
    onValue(storesRef, (snapshot) => {
      const data = snapshot.val();
      const storesList = Object.values(data);
      setStores(storesList);
    });
  }, []);

  return (
    <div className="locationContainer">
      <header className="locationHeader">매장선택</header>
      <div className="location">
        {stores.map((store) => (
          <div key={store.number}>
            <Link
              to={{
                pathname: `/order/menu/${store.number}`,
                state: { storeNumber: store.number },
              }}
            >
              <h2>{store.name}</h2>
              <h3>{store.address}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
