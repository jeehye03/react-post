import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoHeart, IoChatbubbleOutline, IoAddSharp } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import post from "../redux/modules/post";
import user from "../redux/modules/user";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { apiKey } from "../firebase";
import { actionCreators as userActions } from "../redux/modules/user";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  // const user_list = useSelector((state) => state.user.user);
  //console.log(user_list)

  const [is_login, setIsLogin] = React.useState(false);

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
    <div>
      {post_list.map((post, idx) => {
        return (
          <Wrap key={idx}>
            <Container
              onClick={() => {
                navigate("/detail/" + post.id);
              }}
            >
              <Head>
                <p>{post.insert_dt}</p>
              </Head>

              <Img src={post.img_url} />

              <Icon>
                <IoHeart size="27" color="red" />
                {/* <div>{post.like_cnt}</div> */}
                <IoChatbubbleOutline size="25" />
                {/* <div>{post.comment_cnt}</div> */}
                <BsBookmark size="23" />
              </Icon>
              <Contents>
                <span>{post.user_nm}</span>
                <div>{post.contents}</div>
              </Contents>
            </Container>
          </Wrap>
        );
      })}

      {is_login ? (
        <Btn
          onClick={() => {
            navigate("/write");
          }}
        >
          <IoAddSharp size="28" />
        </Btn>
      ) : (
        ""
      )}
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "Cafe24Ohsquareair";
`;

const Container = styled.div`
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 450px;
  box-sizing: border-box;
  text-align: left;
  padding: 16px;
  position: relative;
  margin-bottom: 15px;
`;

const Head = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
  & p {
    font-size: 13px;
  }
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 15px;
  left: 20px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 350px;
  height: 300px;
  padding: 16px 0;
`;

const Contents = styled.div`
  display: flex;
  position: absolute;
  bottom: 15px;
  left: 140px;

  & span {
    font-weight: 600;
    padding-right: 10px;
  }
`;

const Btn = styled.button`
 
    width: 50px;
    height: 50px;
    border-radius: 50%;
    outline: none;
    border: none;
    background-color: #DAD9FF;
    cursor: pointer;
   position:absolute;
   right:30px;
  
   `;

export default Main;
