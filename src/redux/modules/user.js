// widgets.js

import "firebase/auth";
import {  createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";



// Actions

const SET_USER = "SET_USER";
const DELETE_USER = "DELETE_USER";

const LOAD = "user/LOAD";

const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SIGNUP = "user/SIGNUP";
const LOGINCHECK = "user/LOGINCHECK";

const initialState = {
  list:[]
};

// Action Creators
const setUser = createAction(SET_USER, (user) => ({ user }));

export function loadUsers(user_list) {
  return {type:LOAD ,user_list}
}

export function loginUser() {
  return { type: LOGIN };
}


export function logoutUser() {
  return { type: LOGOUT };
}
export function signupUser() {
  return { type: SIGNUP };
}

export function loginchekUser() {
  return { type: LOGINCHECK };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function  signUpFB(id, nm, pw) {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, id, pw)
      .then((user) => {
          console.log("야호",user); //성공을 했다면 야호를 찍어!
          
          //프로필 업데이트
          updateProfile(auth.currentUser, {
            displayName: nm,
          })
            .then(() => {
              dispatch(
                setUser({
                  user_name: user.user.displayName,
                  id: user.user.email,
                  uid: user.user.uid,
                })
              );
                
            })
            .catch((error) => {
              console.log(error);
            });   
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("회원가입에 문제가 있어요! 잠시후 다시 시도해주세요.");
        console.log(errorCode, errorMessage);
      });
  };
}

export function  logInFB(id, pw) {
    console.log("로그인 ?")
    return (dispatch) => {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            signInWithEmailAndPassword(auth, id, pw)
              .then((user) => {
                dispatch(
                  setUser({
                    user_name: user.user.displayName,
                    id: user.user.email,
                    uid: user.user.uid,
                  })
                );
              
            });
          })
          
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            window.alert("로그인에 문제가 있어요! 잠시후 다시 시도해주세요.");
            console.log(errorCode, errorMessage);
          });
       
    }
}

const loginCheckFB = () => {
  return function (dispatch, getState) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.user.displayName,
            id: user.user.email,
            uid: user.user.uid,
          })
        );
      }else{
        signOut(auth)
      }
    })
  }
}

export const loadUserFB = () => {
  return async function (dispatch) {
    const dic_data = await getDocs(collection(db, "users"));
    let list = [];
    dic_data.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadUsers(list));
  };
};








//  const user = await createUserWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
//   console.log(user);

//   // 유저정보 업데이트하기
//   const user_data = await addDoc(collection(db, "users"), {
//       user_id: id_ref.current.value,
//       name: name_ref.current.value
//   });

//reducer
// export default handleActions (
//   {
//     [SET_USER]: (state,action) => produce(state, (draft) => {
    
//       draft.user = action.payload.user;
//       draft.is_login = true;
//     }),


//     // [GET_USER] : (state, action) => produce(state, (draft) => {

//     // }),
//   },
//   initialState
// );

// const actionCreators = {
//   setUser,
//   loginCheckFB,
// };

// export { actionCreators };

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // 불러오기
    case "user/LOAD": {
      return { list: action.user_list };
    }
    default:
      return state;
  }
}