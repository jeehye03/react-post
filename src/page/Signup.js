import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signUpFB } from "../redux/modules/user";

const Signup = () => {
  const id_ref = React.useRef();
  const name_ref = React.useRef();
  const pw_ref = React.useRef();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signupBtn = async () => {
    //값이 전부 말짱해 > 벨리데이션
    if (
      id_ref.current.value === "" ||
      name_ref.current.value === "" ||
      pw_ref.current.value === ""
    ) {
      return window.alert("모두 입력해 주세요!");
    } else {
      const id = id_ref.current.value;
      const nm = name_ref.current.value;
      const pw = pw_ref.current.value;

      const user_data = await addDoc(collection(db, "users"), {
        user_id: id_ref.current.value,
        name: name_ref.current.value,
      });

      dispatch(signUpFB(id, nm, pw,user_data));
      navigate("/login");
    }

    // //가입시키기
    // const user = await createUserWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
    // console.log(user);

    // // 유저정보 업데이트하기
    // const user_data = await addDoc(collection(db, "users"), {
    //     user_id: id_ref.current.value,
    //     name: name_ref.current.value
    // });
    // console.log(user_data.id);
    // id_ref.current.value = "";
    // name_ref.current.value = "";
    // pw_ref.current.value = "";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Wrap>
        <Container>
          <h1>회원가입</h1>

          <p>아이디(이메일)</p>
          <input ref={id_ref} required placeholder="메일을 입력해 주세요" />

          <p>닉네임</p>
          <input ref={name_ref} placeholder="닉네임을 입력해 주세요" />

          <p>비밀번호</p>
          <input
            ref={pw_ref}
            type="password"
            placeholder="비밀번호를 입력해 주세요"
          />

          <button onClick={signupBtn}>회원가입</button>
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

export default Signup;
