import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AccountAPI } from "../../apis/api";

export const getLogin = createAsyncThunk(
  "get/login",
  async (payload, thunkAPI) => {
    try {
      const response = await AccountAPI.getlogin;
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const UserInfo = createSlice({
  name: "POST",
  initialState: {
    userInfo: [],
    is_login: false,
  },
  reducers: {},
  extraReducers: {
    extraReducers: {
      [getLogin.fulfilled]: (state, { payload }) => {
        state.userInfo = payload;
        state.is_login = true;
      },
    },
  },
});

export default UserInfo.reducer;
