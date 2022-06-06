import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Post from "./Post";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";

const Main = () => {
  const navigate = useNavigate();
    
    return (
      <div>
        {/* <Post/>
        <button
          onClick={() => {
            signOut(auth)
          }}
        >
          로그아웃
        </button> */}
        <div>
          <PostList/>
          <h1>환영합니다! :)</h1>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    );
}



export default Main;