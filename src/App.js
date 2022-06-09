import React from 'react';
import './App.css';
import { auth } from './firebase';
import { Mobile, Pc } from './Media';
import { Routes, Route } from "react-router-dom";


import Main from "./page/Main";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Post from "./page/Post";
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/Header';
import styled from 'styled-components';
import PostList from './page/PostList';
import Write from './page/Write';
import { loadPostFB } from './redux/modules/post';
import { useDispatch } from 'react-redux';
import Detail from './page/Detail';
import Edit from './page/Edit';


function App() {

  const dispatch = useDispatch();

React.useEffect(() => {
  dispatch(loadPostFB());
}, []);

  return (
    <Wrap>
      <Mobile />
      <Pc />
      <Header />

      {/* <Routes>
        {is_login ? (
          <Route path="/*" exact element={<Main />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
      </Routes> */}
      <Routes>
        {/* {is_login ? (
          <Route path="/*"  element={<Main />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )} */}
        <Route path="/*" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/detail/:id" element={<Detail />} />
   
      </Routes>
    </Wrap>
  );
}


const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Cafe24Ohsquareair";
`;
export default App;
