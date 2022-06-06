// word.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // crud 할때 쓰는 애들

// Actions
const LOAD = "word/LOAD";
const CREATE = "post/CREATE";
// const CHECK = "word/CHECK";

// const DELETE = "word/DELETE";

const initialState = {
  list: ["test"],
};

// Action Creators
export function loadPost(post_list) {
  return { type: LOAD, post_list };
}

export function createPost(post) {
  return { type: CREATE, post };
}

// export function checkWord(word_index) {
//   return { type: CHECK, word_index };
// }

// export function deleteWord(word_index) {
//   return { type: DELETE, word_index };
// }

// firebase랑 통신하는 함수 // 미들웨어 !!!!

// dispatch를 인자로 받아오는 이유는 dispatch() 처럼 어떤 액션을 줘야 하니까 !
// export const loadWordFB = () => {
//   return async function (dispatch) {
//     const word_data = await getDocs(collection(db, "word"));
//     //console.log(word_data)

//     let word_list = [];

//     //리덕스에 넣어주기
//     word_data.forEach((doc) => {
//       //console.log(doc.data())
//       word_list.push({ id: doc.id, ...doc.data() });
//     });
//     //console.log(word_list);

//     dispatch(loadPost(word_list));
//   };
// };

export const createPostFB = (post) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "post"), post);
    // console.log((await getDoc(docRef)).data());
    // const _word = await getDoc(docRef);
    const word_data = { id: docRef.id, ...post };

    // console.log(word_data);

    //액션을 일으며! 나 바꿔줘!
    dispatch(createPost(word_data));
  };
};


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/LOAD": {
      return { list: action.post_list };
    }

    case "post/CREATE": {
      const new_post_list = [...state.list, action.post];
      return { list: new_post_list };
    }


    // do reducer stuff
    default:
      return state;
  }
}
