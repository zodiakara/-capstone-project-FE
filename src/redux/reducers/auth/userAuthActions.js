import { createAsyncThunk } from "@reduxjs/toolkit";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (newUser, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      await fetch(`${BE_URL}/users/register`, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (loggedUser, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(loggedUser),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/users/login`, config);
      if (response.ok) {
        const data = await response.json();
        console.log("log user res:", data);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        // if (accessToken) {
        //   const config = {
        //     method: "GET",
        //     headers: new Headers({
        //       "Content-Type": "application/json",
        //       Authorization: "Bearer " + accessToken,
        //     }),
        //   };
        //   try {
        //     const response = await fetch(`${BE_URL}/users/me`, config);
        //     if (response.ok) {
        //       const user = await response.json();
        //       console.log(user);
        //       return user;
        //     }
        //   } catch (error) {}
        // }
      }
    } catch {}
  }
);
