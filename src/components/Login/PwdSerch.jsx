import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";

const PwdSerch = () => {
  const [email, setEmail] = useState("");

  const auth = getAuth();

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
    // console.log(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("이메일이 전송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="loginHeader">비밀번호찾기</header>
      <div className="signupContainer">
        <form onSubmit={onSubmit} className="signUpForm">
          <input
            type="text"
            onChange={onChange}
            placeholder="이메일"
            className="inputs"
          />
          <input type="submit" value="전송" className="submitBtn" />
        </form>
      </div>
    </div>
  );
};

export default PwdSerch;
