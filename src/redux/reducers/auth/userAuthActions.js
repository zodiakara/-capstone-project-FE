import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
      console.log("action fired");

      const config = {
        method: "POST",
        body: JSON.stringify(loggedUser),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/users/login`, config);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("log user res:", data);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        if (accessToken) {
          const config = {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            }),
          };
          try {
            const response = await fetch(`${BE_URL}/users/me`, config);
            console.log("get user/me", response.body);
            if (response.ok) {
              const user = await response.json();
              console.log("this is a user inside token action", user);
              if (user) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                return user;
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
