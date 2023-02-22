import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [nicname, setNicName] = useState("");
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "id") {
      setId(value);
    } else if (name === "pwd") {
      setPwd(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "nicname") {
      setNicName(value);
    }
    // console.log(value);
  };
  const auth = getAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword();
    } catch {
      setError();
    }
  };
  return (
    <div>
      <header>회원가입</header>
      <div className="signupContainer">
        <form onSubmit={onSubmit} className="signUpForm">
          <input
            className="inputs"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            required
            onChange={onChange}
          />
          <input
            name="id"
            type="text"
            placeholder="아이디(영문,숫자 조합 5~16자리)"
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
            name="email"
            type="text"
            placeholder="이메일 주소"
            className="inputs"
            required
            onChange={onChange}
          />
          <input
            name="nicname"
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
      </div>
    </div>
  );
};

export default SignUp;
