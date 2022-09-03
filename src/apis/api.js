import { api } from "../axios/axios";
import axios from "axios";

export const AccountAPI = {
  getlogin: data => api.post("/api/member/login", data),
  getOneAccount: accountId => api.get(`/${accountId}`),
  getSignInAccount: form => api.post(""),
};

export const PostList = {
  getPostList: () => api.get("/api/post"),
  getOnePost: postId => api.get(`/${postId}`),
  getAddPost: form => api.post("", form),
  getDeletePost: postId => api.delete(`/${postId}`),
  getPatchPost: post => api.patch(`/${post.id}`, post),
};

const URL = "http://localhost:3001/post";
const instance = axios.create({ baseURL: URL });
export const getPosts = async (page, limit) => {
  const response = await instance.get(`/?_page=${page}&_limit=${limit}`);
  return response.data;
};
