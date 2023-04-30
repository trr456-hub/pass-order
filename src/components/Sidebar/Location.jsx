import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Location = () => {
  const [stores, setStores] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const storesRef = ref(db, "passOrder/stores");
    // db호출
    onValue(storesRef, (snapshot) => {
      const data = snapshot.val();
      const storesList = Object.values(data);
      //   console.log(storesList);
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
        <span>매장정보</span>
      </header>
      <div className="location">
        {stores.map((store) => (
          <div key={store.number}>
            <Link to={store.link}>
              <h2>{store.name}</h2>
              <h3>{store.address}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
