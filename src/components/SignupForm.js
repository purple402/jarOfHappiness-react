import React, { useState, useEffect } from "react";
import { createUser } from "../firebase";
import { Message, Alert } from ".";
import { useSetUser } from "../UserContext";

function SignupForm({finishSignup}) {
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    displayName: "",
  });
  const { email, password, passwordConfirm, displayName } = inputs;
  const changeUser = useSetUser();

  function onChange(e) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  useEffect(() => {
    checkPassword();
  }, [password, passwordConfirm]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("signup-loading");
    const user = await createUser(email, password, displayName);
    if (typeof user !== "string") {
      setError(null);
      changeUser(user);
      finishSignup();
    } else {
      setError(null);
      setError(user);
    }
  }

  function checkPassword() {
    // 비밀번호와 비밀번호 확인 비교
    if (password) {
      if (password.length < 6) {
        setPasswordMessage(
          <Message color="gray">
            비밀번호는 여섯 글자 이상 입력해 주세요.
          </Message>
        );
      } else if (password !== passwordConfirm) {
        setPasswordMessage(
          <Message color="orange">비밀번호와 같지 않습니다</Message>
        );
      } else {
        setPasswordMessage(
          <Message color="green">비밀번호와 동일합니다.</Message>
        );
      }
    } else {
      // 비밀번호확인만 입력된 경우
      if (passwordConfirm) {
        setPasswordMessage(
          <Message color="gray">비밀번호를 입력해주세요</Message>
        );
      }
    }
  }

  function handleCancelBtn() {
    finishSignup();
  }

  return (
    <div className="Signup">
      <div className="modalTitle">
        <span>회원가입</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modalFormDiv">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="modalFormDiv">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="modalFormDiv">
          <label htmlFor="password">비밀번호확인</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            minLength="6"
            value={passwordConfirm}
            onChange={onChange}
            required
          />
        </div>
        {passwordMessage}
        <div className="modalFormDiv">
          <label htmlFor="displayName">별명</label>
          <input
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={onChange}
            required
          />
        </div>
        <div className="modalBtnDiv">
          <input
            type="button"
            value="취소"
            className="yellowBtn"
            onClick={handleCancelBtn}
          />
          <input
            type="submit"
            className="greenBtn"
            value="회원가입"
            disabled={false}
          />
        </div>
      </form>
      {error && <Alert code={error} finishAlert={(error) => setError(error)} />}
    </div>
  );
}

export default SignupForm;
