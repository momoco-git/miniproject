import { api } from "../axios/axios";
import axios from "axios";

export const AccountAPI = {
  getlogin: data => api.post("/api/member/login", data),
  getOneAccount: accountId => api.get(`/${accountId}`),
  getSignInAccount: form => api.post("/api/member/signup", form),
};

export const PostList = {
  getPostList: () => api.get("/api/post"),
  getOnePost: postId => api.get(`/api/post/${postId}`),
  getAddPost: form => api.post("/api/auth/post", form),
  getDeletePost: postId => api.delete(`/api/auth/post/{id}/${postId}`),
  getPatchPost: post => api.patch(`/api/auth/post/{id}/${post.id}`, post),
};

const URL = "http://localhost:3001/post";
const instance = axios.create({ baseURL: URL });
export const getItems = async (page, limit) => {
  const response = await instance.get(`/?_page=${page}&_limit=${limit}`);
  return response.data;
};