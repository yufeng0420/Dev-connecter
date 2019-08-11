import { domain } from "../utils/backendDomain";
import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  DELETE_COMMENT,
  ADD_COMMENT
} from "./types";
import { setAlert } from "./alert";

// Get posts

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${domain}/api/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// add one post

export const addPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`${domain}/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("Post successful", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// Add like
export const updateLike = postId => async dispatch => {
  try {
    const res = await axios.put(`${domain}/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// Removed like
export const updateUnlike = postId => async dispatch => {
  try {
    const res = await axios.put(`${domain}/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// delete post

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${domain}/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// Get post by Id

export const getPostById = id => async dispatch => {
  try {
    const res = await axios.get(`${domain}/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// Delete comment

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`${domain}/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};

// add one comment

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      `${domain}/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert("Comment successful", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err
    });
  }
};
