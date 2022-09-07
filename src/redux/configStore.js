import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import post from "./module/postSlice";

export default configureStore({
  reducer: {
    post: post,
  },
});
