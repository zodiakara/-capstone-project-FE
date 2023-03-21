import { Avatar, Box, Button, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  uploadUserAvatar,
} from "../../redux/reducers/auth/userAuthActions";
import { authActions } from "../../redux/reducers/auth/userAuthSlice";

import "./UserAvatar.css";

const UploadUserAvatar = (props) => {
  const { currentUser } = props;
  const dispatch = useDispatch();
  const userAvatar = useSelector((state) => state.auth.userAvatar);
  const userId = useSelector((state) => state.auth.userInfo._id);

  const handleImgUpload = () => {
    if (userAvatar)
      dispatch(uploadUserAvatar({ userId, userAvatar })).then(() => {
        dispatch(getCurrentUser());
      });
  };

  return (
    <>
      <input
        accept="image/*"
        id="avatar"
        className="file-input"
        single
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];

          dispatch(authActions.addAvatar(file));
        }}
      ></input>
      <label htmlFor="avatar">
        <Box className="avatarImgBox">
          <Tooltip title="click to load user avatar" placement="top">
            <Avatar
              imgProps={{
                className: "imgAvatar",
              }}
              sx={{
                height: "200px",
                width: "200px",
                "&:hover": {
                  opacity: "40%",
                },
              }}
              src={
                userAvatar
                  ? URL.createObjectURL(userAvatar)
                  : currentUser.avatar
              }
            />
          </Tooltip>
        </Box>{" "}
      </label>{" "}
      <Button
        onClick={handleImgUpload}
        className="btnStyle"
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginY: "1em",
        }}
      >
        change avatar
      </Button>
    </>
  );
};

export default UploadUserAvatar;
