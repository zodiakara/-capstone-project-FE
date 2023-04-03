import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./messagesActions";

const initialState = {
  messageList: false,
  chatTabList: [],
  loading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    openMessageBox: (state) => {
      state.messageList = true;
    },
    closeMessageBox: (state) => {
      state.messageList = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.chatTabList = action.payload;
      });
  },
});
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
