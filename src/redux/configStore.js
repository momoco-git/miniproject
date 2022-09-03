import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import post from "./module/postSlice";

const rootReducer = combineReducers({
  post: post,
  
});
const store = configureStore({
  reducer: rootReducer
});
export default store;