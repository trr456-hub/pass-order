import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickName] = useState("");
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pwd") {
      setPwd(value);
    } else if (name === "pwd2") {
      setPwd2(value);
    } else if (name === "nickname") {
      setNickName(value);
    }
    // console.log(value);
  };
  const auth = getAuth();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (pwd === pwd2) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, pwd);
        await updateProfile(user, {
          displayName: nickname,
        });
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <div>
      <header className="loginHeader">회원가입</header>
      <div className="signupContainer">
        <form onSubmit={onSubmit} className="signUpForm">
          <input
            name="email"
            type="text"
            placeholder="아이디(test@addres.com 형식으로 적어주세요)"
            className="inputs"
            required
            onChange={onChange}
          />
          <input
            name="pwd"
            type="password"
            placeholder="비밀번호(영문,숫자,특수문자 조합 8~20자리)"
            className="inputs"
            required
            onChange={onChange}
          />
          <input
            name="pwd2"
            type="password"
            placeholder="비밀번호 확인"
            className="inputs"
            required
            onChange={onChange}
          />
          <input
            name="nickname"
            type="text"
            placeholder="닉네임"
            className="inputs"
            required
            onChange={onChange}
          />
          <div className="textBox">
            <div>
              - 회사 정책상 부적절한 단어는 등록이 제한되거나 관리자에 의해
              삭제될 수 있습니다.
            </div>
            <br />
            <div>
              - 닉네임은 매장에서 고객님을 불러드리는데에 사용됩니다. 신중하게
              설정해 주세요.
            </div>
          </div>
          <input type="submit" value="가입" className="submitBtn" />
        </form>
        <div className="errMsg">{error}</div>
      </div>
    </div>
  );
};

export default SignUp;
