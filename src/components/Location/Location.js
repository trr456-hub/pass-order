import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

const Location = () => {
  const [stores, setStores] = useState([]);
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
    <div>
      {stores.map((store) => (
        <div key={store.number}>
          <h2>{store.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Location;
