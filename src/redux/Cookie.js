import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setAccessToken = accessToken => {
  // const today = new Date();
  // const expireDate = today.setHours(today.getHours() + 2);
  return cookies.set("access_token", accessToken, {
    sameSite: "strict",
    path: "/",
    // expires: new Date(expireDate),
  });
};

export const setRefreshToken = refreshToken => {
  // const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
    // expires: new Date(expireDate),
  });
};
export const setCookieName = username => {
  // const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("username", username, {
    sameSite: "strict",
    path: "/",
    // expires: new Date(expireDate),
  });
};
export const setCookieNick = nickname => {
  // const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("nickname", nickname, {
    sameSite: "strict",
    path: "/",
    // expires: new Date(expireDate),
  });
};
export const getAccessToken = () => {
  return cookies.get("access_token");
};
export const removeAccessToken = () => {
  return cookies.remove("access_token");
};
export const getCookieName = () => {
  return cookies.get("username");
};
export const getCookieNick = () => {
  return cookies.get("nickname");
};

export const getRefreshToken = () => {
  return cookies.get("refresh_token");
};

export const removeRefreshToken = () => {
  return cookies.remove("refresh_token");
};
export const removeCookieName = () => {
  return cookies.remove("username");
};
export const removeCookieNick = () => {
  return cookies.remove("nickname");
};
