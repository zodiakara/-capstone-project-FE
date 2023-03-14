import { Avatar, Box, Button } from "@mui/material";
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
              userAvatar ? URL.createObjectURL(userAvatar) : currentUser.avatar
            }
          />
          <Button onClick={handleImgUpload} className="avatarbtn">
            change picture
          </Button>
        </Box>{" "}
      </label>{" "}
    </>
  );
};

export default UploadUserAvatar;
