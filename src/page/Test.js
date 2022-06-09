import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifyBoardFB } from "../shared/FB/Board";
// import { auth } from "../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
//style
// import styled from "styled-components";
// import { documentId } from "firebase/firestore";

const Test = () => {
  console.log();
  const board = useSelector((state) => state.board);
  const { _id } = useParams();
  const [img, setImg] = React.useState("");
  const file_link_ref = React.useRef(""); //
  const dispatch = useDispatch();
  const id = board.list[_id]?.id;
  const [imageSrc, setImageSrc] = React.useState(board.list[_id]?.image);
  let navigate = useNavigate();

  const text = React.useRef(null);
  // console.log(board.list[_id].id);
  //Radio 값 받아오기
  const [LayoutStyle, setLayoutStyle] = useState();
  //시간 받아오기
  const todayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);

    return year + "-" + month + "-" + day + "-" + hours + ":" + minutes;
  };
  //넘겨줄 데이터를 함수에 담음
  const getInputData = () => {
    const content = text.current.value;
    const layoutStyles = LayoutStyle;
    const today = todayString(); // 입력한 날짜
    const image = imageSrc;

    // 반환할 object
    const contents_obj = {
      content: content,
      today: today,
      image: image,
      layouts: layoutStyles,
    };
    return contents_obj;
  };

  //데이터를 리덕스에 옮김
  const updateBoardData = () => {
    const contents_obj = getInputData();
    if (!contents_obj) return;
    const new_contents_obj = {
      ...contents_obj,
    };
    dispatch(modifyBoardFB({ ...new_contents_obj }, id));
  };



  //사진 스토리지에 올림
  const upLoadFB = async (e) => {
    const uploded_file = await uploadBytes(
      ref(storage, `images/${img.name}`), //경로
      img //어떤파일 올릴지
    );
    const file_url = await getDownloadURL(uploded_file.ref);
    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  //사진 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
      <form>
        <h3>게시글 작성</h3>
        이미지 :{""}
        <input
          type="file"
          accept="image/png, image/jpeg"
          // value=
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setImg(e.target.files[0]);
          }}
        />
        <p>레이아웃 고르기</p>
        <label>
          <div>
            왼쪽에 배치
            <input
              type="radio"
              name="layout"
              value="left"
              onChange={(e) => setLayoutStyle(e.target.value)}
            />
          </div>
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </label>
        <label>
          <div>
            오른쪽에 이미지 왼쪽에 텍스트
            <input
              type="radio"
              name="layout"
              value="right"
              onChange={(e) => setLayoutStyle(e.target.value)}
            />
          </div>
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </label>
        <label>
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
          <div>
            상단에 이미지 하단에 텍스트
            <input
              type="radio"
              name="layout"
              value="bottom"
              onChange={(e) => setLayoutStyle(e.target.value)}
            />
          </div>
        </label>
        <div>
          <p>게시물 내용</p>
          <textarea
            rows="10"
            cols="40"
            name="content"
            id="content"
            ref={text}
            defaultValue={board.list[_id]?.content}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => {
            upLoadFB();
            setTimeout(function () {
              updateBoardData();
              navigate(-1);
            }, 1500);
          }}
          value="게시글 작성"
        />
      </form>
    </>
  );
};

export default Test;