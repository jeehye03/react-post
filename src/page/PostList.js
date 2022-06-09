import React from "react";

import { createPostFB } from "../redux/modules/post";
// useDispatch는 데이터를 업데이트할 때,
// useSelector는 데이터를 가져올 때 씁니다.
import {useDispatch, useSelector} from "react-redux";

const PostList = () => {

  const post_list = useSelector((state) => state.post.list)
  console.log(post_list)
  const text_ref = React.useRef();
  const dispatch = useDispatch();
  

  const addPost = () => {
    
    

  }
  return (
    <div>
      
      <textarea ref={text_ref}></textarea>
      <button onClick={addPost}>등록하기</button>
    </div>
  );
};

export default PostList;
