import { createSlice } from "@reduxjs/toolkit";
import { getActiveUserMessages } from "./messagesActions";

const initialState = {
  messageList: false,
  messageBox: false,
  chatTabList: [],
  loading: false,
  activeChat: {},
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    openMessageList: (state) => {
      state.messageList = true;
    },
    closeMessageList: (state) => {
      state.messageList = false;
    },
    openMessageBox: (state) => {
      state.messageBox = true;
    },
    closeMessageBox: (state) => {
      state.messageBox = false;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveUserMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveUserMessages.fulfilled, (state) => {
        state.loading = false;
      });
  },
});
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
