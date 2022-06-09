import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { db, storage } from "../firebase";
import { addPostFB, createPost } from "../redux/modules/post";

const Post = () => {
  const file_link_ref = React.useRef();
  const dispatch = useDispatch();

  const uploadFB = async (e) => {
    

    const uploded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(uploded_file);

    //파일 다운로드
    const file_url = await getDownloadURL(uploded_file.ref);
    console.log(file_url);
    file_link_ref.current = { url: file_url }; //ref에 파일 보관
  
  };
  const text_area = React.useRef();
  const upload = async () => {
    const post = await addDoc(collection(db, "post"), {
      text: text_area.current.value,
      img_url: file_link_ref.current.url
    });
    dispatch(createPost(post))
  };

  //미리보기
  // const [imageSrc, setImageSrc] = React.useState("");

  // const imgUpLoad = (file) => {
  //   const reader = new FileReader();

  //   reader.readAsDataURL(file);

  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setImageSrc(reader.result);

  //       resolve();
  //     };
  //   });
  // };

  return (
    <div>
      이미지:
      <input type="file" onChange={uploadFB} />
      <br />
      <textarea ref={text_area}></textarea>
      <button onClick={upload}>등록하기</button>
      {/* <main>
        <h2>이미지 미리보기</h2>
        <input
          type="file"
          onChange={(e) => {
            imgUpLoad(e.target.files[0]);
          }}
        />
        <ImgWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
          test
        </ImgWrap>
        <ImgWrap2>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
          test2
        </ImgWrap2>
        <ImgWrap3>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
          test3
        </ImgWrap3>
      </main> */}
    </div>
  );
};

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
  width: 200px;
`;

export default Post;
