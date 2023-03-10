import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./userAuthActions";

const initialState = {
  loading: false,
  userInfo: {
    // _id: "",
    // name: "",
    // surname: "",
    // email: "",
    // avatar: "",
  },
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        state.userInfo = {
          _id: action.payload._id,
          name: action.payload.name,
          surname: action.payload.surname,
          email: action.payload.email,
          avatar: action.payload.avatar,
        };
      });
    //deprecated
    //register user Action:
    // [registerUser.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [registerUser.fulfilled]: (state, payload) => {
    //   state.loading = false;
    //   state.success = true;
    // },
    // [registerUser.rejected]: (state, payload) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
});

const { reducer } = authSlice;
export default reducer;
