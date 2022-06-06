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

function App() {

  const [is_login, setIsLogin] = React.useState(false);

  console.log(auth.currentUser); 

  const loginChek = async(user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false)
    }
  }
  React.useEffect(() => {
    onAuthStateChanged(auth,loginChek);
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
        {is_login ? (
          <Route path="/*"  element={<Main />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {/* <Route path="/*" element={<Main />} /> */}
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/post" element={<Post />} />
        <Route path="/postlist" element={<PostList />} />
      
      
      </Routes>
    </Wrap>
  );
}


const Wrap = styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content:center;


`;
export default App;
