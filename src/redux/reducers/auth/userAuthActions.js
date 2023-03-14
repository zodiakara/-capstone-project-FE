import { NotificationAdd } from "@mui/icons-material";
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
            return rejectWithValue(error.message);
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getUserProfile",
  async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        }),
      };
      const response = await fetch(`${BE_URL}/users/me`, config);
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        return user;
      }
    } catch (error) {}
  }
);

export const uploadUserAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async ({ userId, userAvatar }) => {
    const form = new FormData();
    form.append("avatar", userAvatar);
    try {
      const config = {
        method: "POST",
        body: form,
      };
      const response = await fetch(
        `${BE_URL}/users/${userId}/uploadAvatar`,
        config
      );
      if (response.ok) {
        console.log("picture added");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, data }) => {
    try {
      const config = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
          // Authorization: "Bearer " + accessToken,
        }),
      };
      const response = await fetch(`${BE_URL}/users/${userId}`, config);
      if (response.ok) {
      }
    } catch (error) {}
  }
);
