import React, { useEffect, useState } from "react";
import Router from "./Router";
import { Auth } from "fbase";
import loding from "assets/giphy.gif";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoginState, setIsLoginState] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [sellerState, setSellerState] = useState(false);
  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email === "trr456@naver.com") {
          setSellerState(true);
          setUserObj(user);
        } else {
          setIsLoginState(true);
          setUserObj(user);
        }
      } else {
        setIsLoginState(false);
      }
      setInit(true);
    }, []);
  });
  return (
    <div>
      {init ? (
        <Router
          isLoginState={isLoginState}
          userObj={userObj}
          sellerState={sellerState}
        />
      ) : (
        <img
          src={loding}
          alt="lodingImg"
          style={{
            display: "flex",
            height: "100vh",
            margin: "0 auto",
            width: "100%",
            maxWidth: "800px",
          }}
        />
      )}
    </div>
  );
};

export default App;
