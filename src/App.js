import React from 'react';
import './App.css';

import { Mobile, Pc } from './Media';
import { Routes, Route } from "react-router-dom";


import Main from "./page/Main";
import Login from "./page/Login";
import Signup from "./page/Signup";

import Header from './components/Header';
import styled from 'styled-components';

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
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
