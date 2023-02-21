import React, { useEffect, useState } from "react";
import Router from "./Router";
import { Auth } from "fbase";

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
        "ffffff..."
      )}
    </div>
  );
};

export default App;
