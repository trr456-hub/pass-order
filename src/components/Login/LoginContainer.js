import React from "react";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const auth = getAuth();
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
      <img alt="logo" src="src/assets/coffeeLogo.png" />
      <h3>저렴다방에</h3>
      <h3>오신 것을 환영합니다</h3>
      <button>저렴다방 아이디 로그인</button>
      <button>아이디찾기</button>
      <button>비밀번호찾기</button>
      <button>회원가입</button>
      <button name="google" onClick={socialLogin}>
        Google 로그인
      </button>
      <button name="facebook" onClick={socialLogin}>
        FaceBook 로그인
      </button>
    </div>
  );
};

export default Login;
