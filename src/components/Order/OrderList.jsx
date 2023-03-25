import React from "react";
import { useLocation } from "react-router-dom";

const OrderList = () => {
  const location = useLocation();
  const paymentObj = location.state;
  console.log(location);
  return <div></div>;
};

export default OrderList;
