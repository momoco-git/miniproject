import { AccountAPI } from "../apis/api";
import { Cookies } from "react-cookie";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeRefreshToken,
} from "../redux/Cookie";

const refresh = async config => {
  const refreshToken = getRefreshToken();
  const preaccessToken = getAccessToken();

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (!preaccessToken && refreshToken) {
    // 토큰 갱신 서버통신

    // const response = await AccountAPI.getlogin(body);
    // 여기 도 백이랑 연결되면 토큰 가져오기 수정
    config.headers["Authorization"] = `Bearer ${preaccessToken}`;
    config.headers["Refresh-Token"] = `${refreshToken}`;
  } else {
    const accessToken = preaccessToken?.split(" ")[1];
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["Refresh-Token"] = `${refreshToken}`;
  }

  return config;
};

const refreshErrorHandle = err => {
  console.log(err);
  removeRefreshToken();
};

export { refresh, refreshErrorHandle };

// const expireAt = localStorage.getItem("expiresAt"); // 쿠키 가져와봐서 이부분 만 수정 하면 될꺼같음
// let token = localStorage.getItem("accessToken");
