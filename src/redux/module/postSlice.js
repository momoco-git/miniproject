import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  isDone:false
};

const post = createSlice({
  name: "POST",
  initialState: {
    list: []
  },
  reducers: {},
  extraReducers: {},
});


//db에서 데이터 가져옴
export const __getPost = createAsyncThunk(
  "po/GET_Post",
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
// db에 데이터를 넣음
export const __addPost = createAsyncThunk(
  "post/ADD_Post",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/post", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//db내 데이터 삭제
export const __deletePost = createAsyncThunk(
  "post/DELETE_Post",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete("http://localhost:3001/post"+"/"+payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//데이터 수정
export const __updatePost = createAsyncThunk(
  "post/UPDATE_POST",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        "http://localhost:3001/post"+"/"+payload.id,
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
  initialState,
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
    // addMusic Thunk
    [__addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list.push(action.payload);
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // deleteMusic Thunk
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = state.list.filter((post) => post.id !== action.payload);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // updateMusic Thunk
    [__updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = state.list.map((mpostsic) =>
      post.id === action.payload.id ? { ...action.payload } : post
      );
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // post Comment Thunk
    // [__postComment.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   const index = state.list.findIndex(music=>music.id === action.data.id)
    // },
  },
});
export default posts.reducer;
