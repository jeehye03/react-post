import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosHome } from "react-icons/io";

const Header = () => {
    const navigate = useNavigate();


  return (
    <Wrap>
      <Container>
        <IoIosHome
          size="30"
          onClick={() => {
            navigate("/");
          }}
        >
          home
        </IoIosHome>
        <div>
          <Btn
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </Btn>
          <Btn
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Btn>
        </div>
      </Container>
    </Wrap>
  );
}


const Wrap = styled.div`
display:flex;
justify-content:center;
`;
const Container = styled.div`

width:1000px;
height:95px;
display:flex;
justify-content:space-between;
align-items:center;
padding:20px;
box-sizing:border-box;
`;

const Btn = styled.button`
outline:none;
width:150px;
height:50px;
margin-left:5px;
`;

export default Header;