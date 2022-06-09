import { createAction, handleActions } from "redux-actions";

import { produce } from "immer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment";

//action

const LOAD = "post/LOAD";
const CREATE = "post/CREATE";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";
const PREVIEW = "post/PREVIEW";

//action creator
export function loadPost(post_list) {
  return { type: LOAD, post_list };
}

export function createPost(post) {
  return { type: CREATE, post };
}

export function updatePost(post,post_id) {
  return { type  : UPDATE , post,post_id}
}

export function deletePost(post_index) {
  return { type: DELETE, post_index };
}

export function previewPost(preview) {
  return { type: PREVIEW ,preview};
}

const initialState = {
  list: [],
};

const initialPost = {
  // user_info: {
  //   id: 0,
  //   user_name: 'fall',
  //   user_profile: '../../img/IMG_2246 2.jpg'
  // },
  image_url: "../../img/IMG_2246 2.jpg",
  text: "야호",
  // like_cnt: 0,
  // is_like: false,
  // contents: "가을",
  // comment_cnt: 0,
  // insert_dt: moment().format("YYYY-MM-DD hh:mm:ss a"),
};

//미들웨어
export const loadPostFB = () => {
  return async function (dispatch, getState) {
    const post_data = await getDocs(collection(db, "post"));


    //console.log(word_data)

    let post_list = [];

    // //리덕스에 넣어주기
    post_data.forEach((doc) => {
      //console.log(doc.data())
      post_list.push({ id: doc.id, ...doc.data() });
    });


    dispatch(loadPost(post_list));
  };
};

export const addPostFB = (post) => {
  return async function (dispatch,getState) {


    const docRef = await addDoc(collection(db, "post"), post);
  
    console.log(docRef);

    const post_data = { id: docRef.id, ...post };

    //액션을 일으며! 나 바꿔줘!
    dispatch(createPost(post_data));
  };
};


export const updatePostFB = (post,post_id) => {
  return async function (dispatch) {
  

    const docRef = doc(db, "post", post_id);
    
    await updateDoc(docRef, post)
    // 도큐먼트 정보, 어떻게 수정할건지
    
    dispatch(updatePost(post, post_id))

  };
}


export const deletepostFB = (post_id) => {
  return async function (dispatch, getState) {
    if (!post_id) {
    
      window.alert("아이디가 없어요");
      return;
    } 

    const docRef = doc(db, "post", post_id);
    console.log(post_id)
    await deleteDoc(docRef);

    const _post_list = getState().post.list;
   
    const post_index = _post_list.findIndex((w) => {
      console.log(w.id, post_id)
      
      return w.id === post_id;
    });

    dispatch(deletePost(post_index));
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

      
    // case "post/UPDATE": {
    //   const newState = [...state.list, ...action.post];
    //   // state.list배열에 수정된 값 배열을 바꿔줍니다.
    //   return { list: newState }; // 뉴스테이트를 list로 바꿔줍니다/
      
    // }

    case "post/UPDATE": {
      
      const new_post_list = state.list.map((e, idx) => {
     console.log( e)
        if (action.post.id === e.id) {
          return {
            ...e,
            contents: action.post.contents,
            img_url: action.post.img_url,
          }
        } else { return e; }
      }); return { list: new_post_list };
    }
      

    case "post/DELETE": {
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post_index) !== idx;
      });
      return { list: new_post_list };
    }

      
    // do reducer stuff
    default:
      return state;
  }
}

