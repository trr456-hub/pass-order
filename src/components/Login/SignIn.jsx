import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pwd") {
      setPwd(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      <header className="loginHeader">로그인</header>
      <div className="signupContainer">
        <form onSubmit={onSubmit} className="signUpForm">
          <input
            name="email"
            className="inputs"
            type="text"
            placeholder="이메일"
            onChange={onChange}
          />
          <input
            name="pwd"
            className="inputs"
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
          />
          <input className="submitBtn" type="submit" value="로그인" />
        </form>
        <div className="errMsg">{error.message}</div>
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
      </div>
    </div>
  );
};

export default SignIn;
