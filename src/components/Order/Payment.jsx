import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "fbase";
import { getDatabase, onValue, ref } from "firebase/database";

const Payment = ({ userObj }) => {
  const [clicked, setClicked] = useState(false);
  const [sum, setSum] = useState(0);
  const [discountSum, setDiscountSum] = useState(0);
  const [stamps, setStamps] = useState(0);
  const [request, setRequest] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stores, setStores] = useState([]);
  const [coupon, setCoupon] = useState(0);
  const [couponValue, setCouponValue] = useState(0);

  const navigation = useNavigate();
  const location = useLocation();
  const cartItem = location.state.cartItem;
  const storeItem = location.state.storeItem;
  const storeNumber = storeItem.number.toString();
  const userId = userObj.uid;

  // 현재 년,월,일,요일,시간을 구하는 함수
  const dateTime = () => {
    let today = new Date();
    let year = today.getFullYear(); // 년
    let month = today.getMonth(); // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일
    const weekDay = ["일", "월", "화", "수", "목", "금", "토"];

    let hours = String(today.getHours()).padStart(2, "0"); // 시
    let minutes = String(today.getMinutes()).padStart(2, "0"); // 분

    const getDate = `${year}년${month + 1}월${date}일/${weekDay[day]}요일`;
    const getTime = `${hours}시${minutes}분`;
    setDate(getDate);
    setTime(getTime);
  };

  /** 요청사항을 넘겨주는 함수 */
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setRequest(value);
  };

  /** 토탈 가격을 구해주는 함수 */
  const totalPrice = useCallback(() => {
    let total = 0;
    cartItem.forEach((e) => (total += e.price));
    if (couponValue === "1") {
      total <= 2700 ? setDiscountSum(0) : setDiscountSum(total - 2700);
    } else {
      setSum(total);
    }
  }, [cartItem, couponValue]);

  /** 스탬프의 개수를 정해주는 함수 */
  const totalStamps = useCallback(() => {
    let stamps = 0;
    cartItem.forEach((e) => (stamps += e.number));
    setStamps(stamps);
  }, [cartItem]);

  /** select value를 구해주는 함수 */
  const changeValue = (e) => {
    const {
      target: { value },
    } = e;
    setCouponValue(value);
  };

  /** 결제수단 구분해주는 함수 */
  const sudanClick = (e) => {
    const btnType = e.target.innerText;
    if (btnType === "카드결제") {
      setClicked("card");
    } else if (btnType === "Kakao Pay") {
      setClicked("kakaopay");
    } else {
      setClicked("test");
    }
  };
  /** stamp 에 기록을 재정의 해주는 Object */
  const stampAccumulate = {
    store: storeItem.name,
    stamp: stamps,
    date: date,
    time: time,
  };
  /** test 결제 버튼이 눌렸을때 실행되는 함수 */
  const handleTestPayment = async (e) => {
    if (!window.confirm("결제하시겠습니까?")) {
      e.preventDefault();
      return;
    }
    const docRef = doc(dbService, storeNumber, userId);
    const basketRef = doc(dbService, "Basket", userId);
    const stampRef = doc(dbService, "Stamp", userId);
    const subStampRef = collection(stampRef, "stamp");

    try {
      const [recordSnap, stampAndCouponSnap] = await Promise.all([
        getDoc(doc(subStampRef, "stampRecord")),
        getDoc(doc(subStampRef, "stampAndCoupon")),
      ]);
      // 스탬프 적립내역 변수모음
      const prevRecord = recordSnap.data()?.recordItem || [];
      const newRecords = [...prevRecord, stampAccumulate];
      // 스탬프 적립 변수 모음
      const stampAndCouponData = stampAndCouponSnap?.data() || {};
      const { stamp: currentStamp = 0, coupon: currentCoupon = 0 } =
        stampAndCouponData;
      console.log(currentStamp);
      // 기존 주문내역 확인 변수 모음
      const storesArr = stores.map((item) => item.number.toString());
      const storeIndex = storesArr.map((item) => doc(dbService, item, userId));
      // 결제시 추가되는 데이터 처리 모음
      await Promise.all([
        storeIndex.map(async (item) => await deleteDoc(item)),
        setDoc(docRef, {
          creatorId: userObj.uid,
          user: userObj.displayName,
          store: storeItem,
          order: cartItem,
          total: couponValue === "1" ? discountSum : sum,
          stamp: stamps,
          request: request,
          createdAt: Date.now(),
          orderCall: "준비완료 후 수령 가능",
        }),
        await deleteDoc(basketRef),
        await setDoc(subStampRef, {
          recordItem: newRecords,
        }),
        await (stampAndCouponData === null
          ? setDoc(doc(subStampRef, "stampAndCoupon"), {
              stamp: stamps,
              coupon: 0,
            })
          : couponValue === "1"
          ? updateDoc(doc(subStampRef, "stampAndCoupon"), {
              coupon: increment(-1),
            })
          : updateDoc(doc(subStampRef, "stampAndCoupon"), {
              stamp: increment(stamps),
            })),
      ]);
      console.log("결제완료");
    } catch (error) {
      console.log("에러 : ", error);
    }
  };
  useEffect(() => {
    const db = getDatabase();
    const storesRef = ref(db, "passOrder/stores");
    //db호출 여 매장정보 프린팅
    onValue(storesRef, (snapshot) => {
      const data = snapshot.val();
      const storesList = Object.values(data);
      setStores(storesList);
    });

    /** 현재 쿠폰의 갯수를 구해주는 함수 */
    const getCoupon = async () => {
      const couponRef = doc(dbService, "Stamp", userId);
      const subCouponRef = collection(couponRef, "stamp");
      const stampAndCouponRef = doc(subCouponRef, "stampAndCoupon");
      const couponSnap = await getDoc(stampAndCouponRef);
      const couponData = couponSnap.data();
      setCoupon(couponData.coupon);
    };
    getCoupon();
  }, [userId, coupon]);
  useEffect(() => {
    totalPrice();
    totalStamps();
    dateTime();
  }, [totalPrice, totalStamps]);
  return (
    <div className="paymentContainer">
      <header className="menuHeader">
        <div onClick={() => navigation(-1)} className="backArrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <span>결제페이지</span>
      </header>
      <div className="paymentElement">
        <div className="storeTitle">{storeItem.name}</div>
        {cartItem.map((item, index) => (
          <div key={index} className="paymentArr">
            <img
              src={item.img}
              alt="basketImg"
              style={{ width: 70, height: 70 }}
            />
            <div className="paymentInf">
              <div className="pnContainer">
                <h1>{item.name}</h1>
              </div>
              <span>{item.size}</span>
              <span>{item.type}</span>
              <div className="pnContainer">
                <span>{item.price} 원</span>
                <span>{item.number} 잔</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="requestComent">
        <h1>
          요청사항<span> {`(ex. 캐리어 준비해주세요)`}</span>
        </h1>
        <input
          onChange={onChange}
          type="text"
          placeholder="요청사항이 있으면 적어주세요."
        />
      </div>
      <div className="couponTap">
        <span>쿠폰사용</span>
        <select onChange={changeValue}>
          {coupon !== 0 ? (
            <>
              <option value={0}>쿠폰을 선택해 주세요.</option>
              {/* Array.from 너 배열이 되어라! */}
              {Array.from({ length: coupon }).map((item, i) => (
                <option key={i} value={1}>
                  아이스 아메리카노L 무료쿠폰
                </option>
              ))}
            </>
          ) : (
            <option>쿠폰이 없습니다.</option>
          )}
        </select>
      </div>
      <div className="sudan">
        <span>결제수단</span>
        <div>
          <h2 onClick={sudanClick} className={clicked === "card" ? "card" : ""}>
            카드결제
          </h2>
          <h2
            onClick={sudanClick}
            className={clicked === "kakaopay" ? "kakaopay" : ""}
          >
            Kakao Pay
          </h2>
          <h2 onClick={sudanClick} className={clicked === "test" ? "test" : ""}>
            TEST결제
          </h2>
        </div>
      </div>
      <div className="pricePayment">
        <div>
          <span>적립예정스탬프</span>
          <span>{stamps} 개</span>
        </div>
        <div>
          <span>상품금액</span>
          <span>{sum} 원</span>
        </div>
        <div>
          <span>할인금액</span>
          {couponValue !== "1" ? <span>-0 원</span> : <span>-2700 원</span>}
        </div>
        <div style={{ paddingBottom: 25, borderBottom: "1px solid lightGray" }}>
          <span>결제금액</span>
          {couponValue !== "1" ? (
            <span style={{ color: "red" }}>{sum} 원</span>
          ) : sum < 2700 ? (
            <span style={{ color: "red" }}>0 원</span>
          ) : (
            <span style={{ color: "red" }}>{discountSum} 원</span>
          )}
        </div>
        <h1>
          {clicked === "card" ? (
            <button>카드결제</button>
          ) : clicked === "kakaopay" ? (
            <button>카카오페이</button>
          ) : clicked === "test" ? (
            // <Link
            //   to={`/orderList/${userObj.uid}`}
            //   state={{ storeItem: storeItem }}
            // >
            <button onClick={handleTestPayment}>TEST결제</button>
          ) : (
            // </Link>
            <button onClick={() => alert("결제수단을 골라주세요.")}>
              결제진행
            </button>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Payment;
