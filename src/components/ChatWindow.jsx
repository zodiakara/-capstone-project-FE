import { Avatar, IconButton, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./ChatWindow.css";
import { io } from "socket.io-client";

// const socket = io(process.env.REACT_APP_BE_DEV_URL, {
//   transports: ["websocket"],
// });

const ChatWindow = (props) => {
  const [text, setText] = useState("");
  const [clientId, setClientId] = useState("");
  const currentUser = useSelector((state) => state.auth.userInfo);

  const resetFormValue = () => setText("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    resetFormValue();
  };

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onKeyDownHandler = (event) => {
    if (event.code === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {};

  return (
    <>
      <Box
        className="chatWindow"
        sx={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: "1px -3px 13px -1px rgba(195, 195, 195, 1)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",
            zIndex: "1",
            height: "40px",
            justifyContent: "space-between",
            width: "250px",
            padding: "4px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", padding: "4px" }}>
            <Avatar
              sx={{
                border: "0.1px solid grey",
              }}
            />
            <Box>
              <Stack direction="row">
                <Typography>User</Typography> <Typography>Name</Typography>
              </Stack>
              <Stack direction="row">
                {currentUser ? (
                  <Typography> </Typography>
                ) : (
                  <Typography>active</Typography>
                )}
              </Stack>
            </Box>
          </Box>
          <IconButton
            onClick={props.handleClosePopper}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            height: "200px",
            backgroundColor: "white",
            zIndex: "0",
            display: "flex",
            padding: "8px",
            flexDirection: "column",
          }}
        >
          chat goes here
        </Box>
        <Box
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            display: "flex",
            backgroundColor: "lightgrey",
            height: "40px",
            justifyContent: "space-between",
            padding: "4px",
          }}
        >
          <Box className="messageBoxWrapper">
            <input
              className="messageBoxInput"
              value={text}
              onChange={onChangeHandler}
            ></input>
          </Box>
          <IconButton>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ChatWindow;
