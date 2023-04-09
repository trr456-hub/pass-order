import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const homeComing = () => {
    navigate("/");
  };
  return (
    <div className="error404">
      404ERROR
      <span>잘못된 페이지 입니다.</span>
      <span onClick={homeComing}>홈으로 돌아가기.</span>
    </div>
  );
};

export default NotFound;
