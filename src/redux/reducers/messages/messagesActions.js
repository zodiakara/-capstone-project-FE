import { createAsyncThunk } from "@reduxjs/toolkit";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

export const getAllUsers = createAsyncThunk("messages/AllUsers", async () => {
  try {
    const config = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    const response = await fetch(`${BE_URL}/users`, config);
    if (response.ok) {
      const users = await response.json();
      return users;
    }
  } catch (error) {
    console.log(error);
  }
});
