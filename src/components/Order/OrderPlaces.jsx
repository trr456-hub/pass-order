import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Order = ({ userObj }) => {
  const [stores, setStores] = useState([]);

  const location = useLocation();
  const coupon = location.state.coupon;
  const navigation = useNavigate();

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
    <div className="locationContainer">
      <header className="locationHeader">
        <div
          onClick={() => navigation("/")}
          className="backArrow"
          style={{ fontSize: 20 }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>매장선택</span>
      </header>
      <div className="location">
        {stores.map((store) => (
          <div key={store.number}>
            <Link
              to={`/orderPlaces/menu`}
              state={{ storeNumber: store, coupon: coupon }}
              onClick={(e) => {
                if (window.confirm(`${store.name} 해당 매장에서 주문합니다.`)) {
                  return;
                } else {
                  e.preventDefault();
                  return false;
                }
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
