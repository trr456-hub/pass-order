import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  return (
    <div>
      <div>저렴다방</div>
      <div>저렴다방에</div>
      <div>오신 것을 환영합니다</div>
      <button>저렴다방 아이디 로그인</button>
      <button>아이디찾기</button>
      <button>비밀번호찾기</button>
      <button>회원가입</button>
      <button onClick={googleLogin}>Google 로그인</button>
      <button>FaceBook 로그인</button>
    </div>
  );
};

export default Login;
