import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import firebase from "firebase/compat";
import { actionCreators as postActions } from "./post";

const SET_HEART = "SET_HEART";
const ADD_HEART = "ADD_HEART";
const CANCEL_HEART = "CANCEL_LIKE";

const setHeart = createAction(SET_HEART, (post_id, user_list) => ({
  post_id,
  user_list,
}));
const addHeart = createAction(ADD_HEART, (post_id, user_id) => ({
  post_id,
  user_id,
}));

const cancelHeart = createAction(CANCEL_HEART, (post_id, user_id) => ({
  post_id,
  user_id,
}));

const initialState = {
  list: {},
};

const getHeartFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const heartDB = firestore.collection("heart");
    heartDB
      .where("post_id", "==", post_id)
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push(doc.data().user_id);
        });
        console.log(list);

        dispatch(setHeart(post_id, list));
      })
      .catch((err) => {
        window.alert("좋아요 정보를 가져올수 없습니다", err);
      });
  };
};

const addHeartFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const heartDB = firestore.collection("heart");
    const user_info = getState().user.user;
    console.log(post_id);
    let heart = {
      user_name: user_info.user_name,
      post_id: post_id,
      user_id: user_info.uid,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    heartDB.add(heart).then((doc) => {
      const postDB = firestore.collection("post");

      const post = getState().post.list.find((l) => l.id === post_id);

      const increment = firebase.firestore.FieldValue.increment(1);

      heart = { ...heart, id: doc.id };

      postDB
        .doc(post_id)
        .update({ heart_cnt: increment })
        .then((_post) => {
          dispatch(addHeart(post_id, user_info.uid));

          if (post) {
            dispatch(
              postActions.editPost(post_id, {
                heart_cnt: parseInt(post.heart_cnt) + 1,
              })
            );
          }
        });
    });
  };
};

const cancelHeartFB = (post_id) => {
    return function (dispatch, getState, {history}){
        const heartDB = firestore.collection("heart");
        const user_info = getState().user.user.uid;
        // console.log(post_id, user_info)
        heartDB
            .where("post_id", "==", post_id)
            .where("user_id", "==", user_info)
            .get()
            .then((docs) => {
                let id = "";
                docs.forEach((doc) => (id = doc.id));
                console.log(docs)
                console.log(id)
                // return;
                heartDB.doc(id).delete().then(() => {
                    const postDB = firestore.collection("post");
                    const post = getState().post.list.find((l) => l.id === post_id);
                    console.log(post)
                
                    const uncrement = firebase.firestore.FieldValue.increment(-1);
                    
                    postDB
                        .doc(post_id)
                        .update({heart_cnt : uncrement})
                        .then((_post) => {
                            dispatch(cancelHeart(post_id, user_info));
                            if(post){
                                if(parseInt(post.heart_cnt) === 0) {
                                    return;
                                }
                            }
                            dispatch(postActions.editPost(post_id, {
                                heart_cnt: parseInt(post.heart_cnt) -1,
                            }))
                        });
                });
            });
    };
};

export default handleActions(
  {
    [SET_HEART]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.user_list;
      }),
    [ADD_HEART]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].push(action.payload.user_id);
      }),
    [CANCEL_HEART]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = draft.list[
            action.payload.post_id].filter((l) => l !== action.payload.user_id);
      }),
  },
  initialState
);

const actionCreators = {
  getHeartFB,
  addHeartFB,
  cancelHeartFB,
  setHeart,
  addHeart,
  cancelHeart,
};

export { actionCreators };
