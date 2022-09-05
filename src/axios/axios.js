import axios from "axios";

import { refresh, refreshErrorHandle } from "../apis/refreshToken";
const BASE_URL = "https://miniprojectteam.herokuapp.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // 토큰 추가하기
  withCredentials: false,
  timeout: 3000,
});

api.interceptors.request.use(refresh, refreshErrorHandle);

api.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);
