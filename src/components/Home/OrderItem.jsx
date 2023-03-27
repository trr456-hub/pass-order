import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const OrderItem = ({ userObj }) => {
  const [stores, setStores] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const userId = userObj.uid;

  useEffect(() => {
    stores.forEach((item) => {
      setNumbers(item.number);
    });
  }, [stores]);

  useEffect(() => {
    const db = getFirestore();
    const storesCollection = collection(db, "passOrder/stores");
    const storesQuery = query(storesCollection, where("uid", "==", userId));
    getDocs(storesQuery)
      .then((querySnapshot) => {
        const storesList = [];
        querySnapshot.forEach((doc) => {
          storesList.push(doc.data());
        });
        setStores(storesList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    console.log(numbers);
  }, [userId]);
  return <div>오더아이템</div>;
};

export default OrderItem;
