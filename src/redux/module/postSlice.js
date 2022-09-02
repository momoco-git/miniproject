import { createSlice } from "@reduxjs/toolkit";

const post = createSlice({
  name: "POST",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: {},
});

export default post.reducer;
