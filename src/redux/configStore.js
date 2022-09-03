import { configureStore } from "@reduxjs/toolkit";
import post from "./module/postSlice";

export default configureStore({
  reducer: {
    posts: post,
  },
});
