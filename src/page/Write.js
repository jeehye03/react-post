import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../firebase";
import styled from "styled-components";
import { db, auth } from "../firebase";
import moment from "moment";
import reducer, { addPostFB, createPost } from "../redux/modules/post";
import { loadUserFB } from "../redux/modules/user";

const Write = () => {
  const fileInput = React.useRef();
  const text_input = React.useRef();
  const img_ref = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const post_id = params.id;

  //유저 정보
  React.useEffect(() => {
    dispatch(loadUserFB());
  }, []);

  const users = useSelector((state) => state.user);

  // user id 와 현재 로그인한 user의 email 과 비교하여 필터링
  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser.email;
  });

  //필터링해서 나온 값 담아주기
  const userNick = user_id[0]?.name;

  const post_list = useSelector((state) => state.post.list);

  const modifyPost = post_list.filter((list, idx) => {
    return list.id === post_id;
  });
  console.log(modifyPost);

  // const [contents,setContents] = React.useState(modifyPost ? modifyPost[0].contents : "")

  // 프리뷰 관리 
  const [imageSrc, setImageSrc] = React.useState();

  const selectFile = async (post) => {
    // file 에서 업로드
    const uploded_file = await uploadBytes(
      ref(storage, `images/${post.target.files[0].name}`),
      post.target.files[0]
    );
    // 스토리지로 url 다운로드
    const file_url = await getDownloadURL(uploded_file.ref);

    img_ref.current = { url: file_url };

    //setFiles(URL.createObjectURL(e.target.files[0]));


    // 프리뷰
    const reader = new FileReader();
    const file = post.target.files[0];

    // //파일내용 읽어오기
    reader.readAsDataURL(file);

    //읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      //reader.result는 파일 내용물
      setImageSrc(reader.result);
    };
  };

  const uploadFile = () => {
    const newPost = {
      user_nm: userNick,
      contents: text_input.current.value,
      img_url: img_ref.current.url,
      like_cnt: 0,
      comment_cnt: 0,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(addPostFB(newPost));

    navigate("/");
  };

  return (
    <Wrap>
      <h1>게시물 작성</h1>

      <Container>
        <input type="file" ref={fileInput} onChange={selectFile} />
        <br />

        <Preview>
          <ImgWrap>
            {imageSrc && <Img src={imageSrc} alt="preview-img" />}
            
          </ImgWrap>
          {/* <ImgWrap2>
            {imageSrc && <Img src={imageSrc} alt="preview-img" />}
            test2
          </ImgWrap2>
          <ImgWrap3>
            {imageSrc && <Img src={imageSrc} alt="preview-img" />}
            test3
          </ImgWrap3> */}
        </Preview>
        <br />
        <textarea ref={text_input} placeholder="게시글 작성"></textarea>

        <button onClick={uploadFile}>등록하기</button>
      </Container>
    </Wrap>
  );
};


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 550px;
  /* height: 450px; */
  box-sizing: border-box;
  padding: 16px;


  & textarea {
    width: 90%;
    height:250px;
    padding:20px;
  }

  & button{
    margin-top: 15px;
  }
`;

const Preview = styled.div`

width:90%;


`;

const ImgWrap = styled.div`
  display: flex;
`;
const ImgWrap2 = styled.div`
  display: flex;
  flex-direction: row-reverse;
  /* justify-content:flex-end; */
`;
const ImgWrap3 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 250px;
`;

export default Write;
