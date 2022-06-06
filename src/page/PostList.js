import React from "react";
import { useDispatch } from "react-redux";

const PostList = () => {

  const text_ref = React.useRef();
  const dispatch = useDispatch();
  

  const addPost = () => {
    console.log(text_ref.current.value)

  }
  return (
    <div>
      
      <textarea ref={text_ref}></textarea>
      <button onClick={addPost}>등록하기</button>
    </div>
  );
};

export default PostList;
