import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosHome,  } from "react-icons/io";
import { IoLogIn,IoLogOut } from "react-icons/io5";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFB } from "../redux/modules/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const [is_login, setIsLogin] = React.useState(false);
  
    React.useEffect(() => {
      dispatch(loadUserFB());
    }, []);
  
 const users = useSelector((state) => state.user);
 console.log(users);

  const user_id = users.list.filter((l, idx) => {
   return l.user_id === auth.currentUser?.email;
 });
 const userNick = user_id[0]?.name;
 console.log(userNick);



  const loginChek = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, loginChek);
  }, []);


  return (
    <Wrap>
      <Container>
        <IoIosHome
          size="30"
          onClick={() => {
            navigate("/");
          }}
        ></IoIosHome>

        <Btn>
          {is_login ? (<div>
            <span style={{ color: "navy" }}>{userNick}</span> 님 환영합니다:)
          </div>):""}
          {/* <div>
            <span style={{ color: "navy" }}>dd</span> 님 환영합니다:)
          </div> */}
          <BsFillPersonPlusFill
            size="30"
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </BsFillPersonPlusFill>
          {is_login ? (
            <IoLogOut
              size="35"
              onClick={() => {
                signOut(auth);
              }}
            >
              로그아웃
            </IoLogOut>
          ) : (
            <IoLogIn
              size="35"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </IoLogIn>
          )}
        </Btn>
      </Container>
    </Wrap>
  );
}


const Wrap = styled.div`
display:flex;
justify-content:center;
`;
const Container = styled.div`

  width: 1000px;
  height: 95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Btn = styled.div`
display:flex;
align-items:center;
outline:none;
width:250px;
justify-content:space-between;
`;

export default Header;