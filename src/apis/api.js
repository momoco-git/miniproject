import { api } from "../axios/axios";
import axios from "axios";

export const AccountAPI = {
  getlogin: data => api.post("/api/member/login", data),
  getOneAccount: accountId => api.get(`/${accountId}`),
  getSignInAccount: form => api.post("/api/member/signup", form),
  getlogout: () => api.get("/api/auth/member/logout"),
};

export const PostList = {
  getPostList: () => api.get("/api/post"),
  getMyPost: username => api.get(`/api/post?username=${username}`),
  getAddPost: form => api.post("/api/auth/post", form),
  getDeletePost: postId => api.delete(`/api/auth/post/${postId}`),
  getPatchPost: post => api.patch(`/api/auth/post/{id}/${post.id}`, post),
};

export const CommentAPI = {
  post: data => api.post("/api/auth/comment", data),
};

const URL = "http://54.177.177.138:8080/api/post";
const instance = axios.create({ baseURL: URL });
export const getItems = async (page, limit) => {
  const response = await instance.get(`/?_page=${page}&_limit=${limit}`);
  return response.data;
};
