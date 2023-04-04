import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyInformation = ({ userObj }) => {
  const navigation = useNavigate();
  return (
    <div className="myInformation">
      <header className="myInformHeader">
        <div
          onClick={() => navigation("/")}
          className="backArrow"
          style={{ fontSize: 20 }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>마이페이지</span>
      </header>
      <div className="myInformContainer">내정보에 온걸 환영한다</div>
    </div>
  );
};

export default MyInformation;
