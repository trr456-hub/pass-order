import React from "react";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import logo from "assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginHome = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const socialLogin = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } else if (name === "facebook") {
      provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logoImg">
        <img src={logo} alt="logo" />
      </div>
      <h3 className="mainText">저렴다방에</h3>
      <h3 className="serveText">오신 것을 환영합니다</h3>
      <div className="BtnContainer">
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="loginBtn login"
        >
          저렴다방 아이디 로그인
        </button>
        <div className="userSearch">
          <button
            className="search"
            onClick={() => {
              navigate("/pwdserch");
            }}
          >
            비밀번호찾기
          </button>
          <button
            className="search"
            onClick={() => {
              navigate("/signup");
            }}
            style={{ borderStyle: "none" }}
          >
            회원가입
          </button>
        </div>
        <div className="socialBtns">
          <button
            className="loginBtn google"
            name="google"
            onClick={socialLogin}
          >
            <span>Google</span> 로그인
          </button>
          <button
            className="loginBtn facebook"
            name="facebook"
            onClick={socialLogin}
          >
            <span>facebook</span> 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginHome;
