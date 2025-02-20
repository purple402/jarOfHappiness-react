import React, { useState } from "react";
import { Modal, UpdateProfileForm } from "./index";
import { useWindowWidth } from "../WindowWidthContext";
import { logout } from "../firebase";
import { useUser, useSetUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Greeting() {
  const user = useUser();
  const changeUser = useSetUser();
  const windowWidth = useWindowWidth();
  let navigate = useNavigate();

  const [updateProfile, setUpdateProfile] = useState(false);

  function handleLogoutBtn() {
    logout();
    changeUser(null);
    navigate("/jarOfHappiness");
  }

  function handleWriteBtn() {
    navigate("/jarOfHappiness/write");
  }

  return (
    <div className="user">
      {windowWidth > 530 ? (
        <>
          <div id="userGreeting">
            <span id="userName">
              안녕하세요, {user.displayName}님! 오늘의 행복을 기록해 봐요!
            </span>
            <span id="userNameHighlight">{user.displayName}</span>
          </div>
          <div id="userButtons">
            <button id="writeBtn" className="greenBtn" onClick={handleWriteBtn}>
              행복 작성하기
            </button>
            <button
              id="updateProfileBtn"
              className="yellowBtn"
              onClick={() => setUpdateProfile(true)}
            >
              정보 수정하기
            </button>
            <button
              id="logoutBtn"
              className="blueBtn"
              onClick={handleLogoutBtn}
            >
              로그아웃 하기
            </button>
          </div>
        </>
      ) : (
        <>
          <p id="userGreeting">
            안녕하세요,{" "}
            <span style={{ backgroundColor: "yellow" }}>
              {user.displayName}
            </span>
            님!
            <br />
            오늘은 어떤 행복한 일이 있었나요?
          </p>
          {/* 폭이 좁으면 버튼 안에서 줄바꿈 */}
          <div id="userButtons">
            <button id="writeBtn" className="greenBtn" onClick={handleWriteBtn}>
              행복
              <br />
              <strong>작성하기</strong>
            </button>
            <button
              id="updateProfileBtn"
              className="yellowBtn"
              onClick={() => setUpdateProfile(true)}
            >
              정보
              <br />
              <strong>수정하기</strong>
            </button>
            <button
              id="logoutBtn"
              className="blueBtn"
              onClick={handleLogoutBtn}
            >
              로그아웃
              <br />
              <strong>하기</strong>
            </button>
          </div>
        </>
      )}

      {/* 정보수정 모달 */}
      {updateProfile && (
        <Modal closeModal={() => setUpdateProfile(!updateProfile)}>
          <UpdateProfileForm
            finishUpdateProfile={() => setUpdateProfile(!updateProfile)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Greeting;
