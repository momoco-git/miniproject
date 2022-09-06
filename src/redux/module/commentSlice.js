import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: [],
  isLoading: false,
  error: null
}

export const __getComment = createAsyncThunk(
  "comment/GET_COMMENT",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comments");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// db에 데이터를 넣음
export const __addComment = createAsyncThunk(
  "comment/ADD_COMMENT",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/comments", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//db내 데이터 삭제
export const __deleteComment = createAsyncThunk(
  "comment/DELETE_COMMENT",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        "http://localhost:3001/comments"+`/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//데이터 수정
export const __updateComment = createAsyncThunk(
  "comment/UPDATE_COMMENT",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        "http://localhost:3001/comments"+`/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
      [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
    },
 
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.list.filter((post) => post.id !== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.map((post) =>
      post.id === action.payload.id ? { ...action.payload } : post
      );
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export default comments.reducer;

