import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";
import styled from "styled-components";

const Login = () => {
  const id_ref = React.useRef();
  const pw_ref = React.useRef();

  const loginFB = async () => {
      const user = await signInWithEmailAndPassword(auth,
          id_ref.current.value,
          pw_ref.current.value
      );
      console.log(user);

      const user_docs = await getDocs(
        query(
          collection(db, "users"),
          where("user_id", "==", user.user.email)
        )
      );
      user_docs.forEach((u) => {
        console.log(u.data());
      }); // 데이터 담아줘야해
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Wrap>
        <Container>
          <h1>로그인</h1>

          <p>아이디(이메일)</p>
          <input ref={id_ref} placeholder="이메일을 입력해 주세요" />

          <p>비밀번호</p>
          <input ref={pw_ref} placeholder="비밀번호를 입력해 주세요" />

          <button onClick={loginFB}>로그인하기</button>
        </Container>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  height: 700px;
  box-sizing: border-box;
  text-align: left;
  padding: 16px;

  & p {
    width: 95%;
  }
  & input {
    width: 95%;
    height: 35px;
    margin-bottom: 5px;
  }

  & button {
    margin-top: 15px;
    width: 100px;
    height: 30px;
  }
`;

export default Login;
