import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  uploadUserAvatar,
  getCurrentUser,
  updateUserInfo,
} from "./userAuthActions";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  userAvatar: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.userAvatar = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, payload) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(uploadUserAvatar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
