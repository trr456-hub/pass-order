import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SellerSidebar = ({ sellerOpen, setSellerOpen, sidebarData }) => {
  const handleClose = () => {
    setSellerOpen(false);
  };
  return (
    <div className={`sellerSidebar ${sellerOpen ? "pOpen" : ""}`}>
      <div className="pCloseBtn">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="sellerSidebarContainer">
        <h1>{sidebarData.user} 의 주문내역</h1>
        <div className="sellerSidebarCategory">
          <span>제품이미지</span>
          <span>제품명</span>
          <span>제품갯수</span>
          <span>제품사이즈</span>
          <span>제품타입</span>
          <span>제품가격</span>
        </div>
        {sidebarData.order &&
          sidebarData.order.map((item, i) => (
            <div key={i} className="sellerSidebarItem">
              <span>
                <img
                  src={item.img}
                  alt={`img${i}`}
                  style={{ width: 80, height: 80 }}
                />
              </span>
              <span>{item.name}</span>
              <span>{item.number} 잔</span>
              <span>{item.size}</span>
              <span>{item.type}</span>
              <span>{item.price} 원</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SellerSidebar;
