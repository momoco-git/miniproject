import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const post = createSlice({
  name: "POST",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: {},
});

export default post.reducer;

export const __getPost = createAsyncThunk(
  "post/GET_POST",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/post", {
        params: {
          page: 10
        }
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updatePost = createAsyncThunk(
  "post/UPDATE_POST",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        "http://localhost:3001/post" +"/"+payload.id,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const posts = createSlice({
  name: "posts",
  // initialState,
  reducers: {},
  extraReducers: {
    // getMusic Thunk
    [__getPost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
      state.isDone = false; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
      state.error = null; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.isDone = true; // 네트워크 요청이 끝났으니, false로 변경
      state.list = [...state.list].concat(action.payload); // Store에 있는 list에 서버에서 가져온 music를 넣음
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.error; // catch 된 error 객체를 state.error에 넣음
    },
  },
});