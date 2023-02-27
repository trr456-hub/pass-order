import React, { useEffect, useState } from "react";
import Router from "./Router";
import { Auth } from "fbase";
import loding from "assets/giphy.gif";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoginState, setIsLoginState] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoginState(true);
        setUserObj(user);
      } else {
        setIsLoginState(false);
      }
      setInit(true);
    }, []);
  });
  return (
    <div>
      {init ? (
        <Router isLoginState={isLoginState} userObj={userObj} />
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
