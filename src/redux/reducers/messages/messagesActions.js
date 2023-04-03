import { createAsyncThunk } from "@reduxjs/toolkit";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

export const getActiveUserMessages = createAsyncThunk(
  "messages/activeChat",
  async (id) => {
    try {
      const config = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }),
      };
      const response = await fetch(`${BE_URL}/messages/user/${id}`, config);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
