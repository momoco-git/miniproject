import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import post from "./module/postSlice";
import comment from "./module/commentSlice";
export default configureStore({
  reducer: {
    posts: post,
    comment: comment,
  },
});
