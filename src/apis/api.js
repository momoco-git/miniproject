import { api } from "../aixos/axios";

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
