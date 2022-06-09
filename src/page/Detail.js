import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deletePost, deletepostFB } from "../redux/modules/post";
import React, { useState } from "react";
import { loadUserFB } from "../redux/modules/user";
import { auth } from "../firebase";
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";


const Detail = () => {
  const post_list = useSelector((state) => state.post.list);
  const users = useSelector((state) => state.user.list);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post_id = params.id;


  React.useEffect(() => {
    dispatch(loadUserFB());

  }, []); 
 
 // 가입한 유저중 내가 있는지 chk
 const user_id = users.filter((l, idx) => {
   
   return l.user_id === auth.currentUser?.email;
 });


  // 닉네임
//  const userNick = user_id[0]?.name;
//  console.log(userNick);


// 작성자와 내가 일치하는지 chk
  const detail = post_list.filter((l, idx) => {
    return l.id === post_id;
  }); 
  //console.log(detail)
  
  // 로그인한 유저 이름
  const is_me = user_id[0].name;

  //console.log(is_me);

  // 포스팅한 유저 이름
  const post_nm = detail[0].user_nm
  //console.log(post_nm)



  return (
    <Wrap>
      <Container>
        <Head>
          <p>{detail[0].insert_dt}</p>
        </Head>

        <Img src={detail[0].img_url} />

        <Icon>
          <IoHeartOutline size="27" />
          {/* <div>{post.like_cnt}</div> */}
          <IoChatbubbleOutline size="25" />
          {/* <div>{post.comment_cnt}</div> */}
          <BsBookmark size="23" />
        </Icon>
        <Contents>
          <span>{detail[0].user_nm}</span>
          <div>{detail[0].contents}</div>
        </Contents>
      </Container>
      <div>
      
        {is_me === post_nm ? (
          <button
            onClick={() => {
              dispatch(deletepostFB(detail[0].id));
              navigate("/");
            }}
          >
            삭제
          </button> // 로그인한 유저와 포스팅 한 유저가 일치하면 버튼 보여줘
        ) : (
          ""
        )}
        {is_me === post_nm ? (
          <button
            onClick={() => {
              navigate("/edit/" + post_id);
            }}
          >
            수정
          </button>
        ) : (
          ""
        )}
      </div>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & button {
    margin-top:15px;
    margin-right:10px;
  }
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

const Img = styled.img`
  width: 350px;
  height: 300px;
  padding: 16px 0;
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

export default Detail;
