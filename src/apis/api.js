import { api } from "../aixos/axios";

export const AccountAPI = {
  getAccount: () => api.get(""),
  getOneAccount: accountId => api.get(`/${accountId}`),
  getSignInAccount: form => api.post(""),
};

export const PostList = {
  getPostList: () => api.get(""),
  getOnePost: postId => api.get(`/${postId}`),
  getAddPost: form => api.post("", form),
  getDeletePost: postId => api.delete(`/${postId}`),
  getPatchPost: post => api.delete(`/${post.id}`, post),
};
