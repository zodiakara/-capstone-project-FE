import { Avatar, Badge, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./ChatWindow.css";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { messagesActions } from "../../redux/reducers/messages/messagesSlice";

const socket = io(process.env.REACT_APP_BE_DEV_URL, {
  transports: ["websocket"],
});

const ChatWindow = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [text, setText] = useState("");

  const [chatTabHistory, setChatTabHistory] = useState({});
  const [latestChat, setLatestChat] = useState({});
  const currentUser = useSelector((state) => state.auth.userInfo);
  const activeChat = useSelector((state) => state.messages.activeChat.user);
  const roomId = useSelector((state) => state.messages.activeChat.roomId);

  const dispatch = useDispatch();
  const resetFormValue = () => setText("");

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  const handleCloseBox = () => {
    dispatch(messagesActions.closeMessageBox());
    dispatch(messagesActions.setActiveChat({}));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    resetFormValue();
  };

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onKeyDownHandler = (event) => {
    if (text && event.code === "Enter") {
      sendMessage();
    }
  };

  const onClickHandler = () => {
    if (text) {
      sendMessage();
      resetFormValue();
    }
  };

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      console.log("newMessage:", newMessage);
      const newObj = chatTabHistory;

      if (newObj[newMessage.sender._id]) {
        newObj[newMessage.sender._id] = [
          ...newObj[newMessage.sender._id],
          newMessage,
        ];
      } else {
        newObj[newMessage.sender._id] = [newMessage];
      }

      let obj = { ...latestChat };
      obj[newMessage.sender._id] = newMessage.content.text;
      setLatestChat({ ...obj });
      setChatTabHistory({ ...newObj });
      if (activeChat._id !== newMessage.sender._id) {
        dispatch(messagesActions.setActiveChat(newMessage.sender));
      }
    });

    socket.on("messageError", (error) => {
      console.log(error);
    });

    socket.on("accept", () => {
      console.log("You have been accepted");
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageError");
      socket.off("accept");
    };
  }, [chatTabHistory, latestChat]);

  useEffect(() => {
    fetchChatHistory(activeChat._id);
  }, []);

  const sendMessage = () => {
    const newMessage = {
      sender: currentUser,
      receiver: activeChat,
      content: {
        text: text,
      },
    };
    socket.emit("sendMessage", newMessage, roomId);
    console.log(newMessage);

    const newObj = chatTabHistory;
    if (newObj[newMessage.receiver._id]) {
      newObj[newMessage.receiver._id] = [
        ...newObj[newMessage.receiver._id],
        newMessage,
      ];
    } else {
      newObj[newMessage.receiver._id] = [newMessage];
    }
    let obj = { ...latestChat };
    obj[newMessage.receiver._id] = newMessage.content.text;
    setLatestChat({ ...obj });
    setChatTabHistory(newObj);
  };

  const fetchChatHistory = async (id) => {
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const response = await fetch(`${BE_URL}/messages/user/${id}`, config);
      if (response.ok) {
        const data = await response.json();
        const obj = { ...chatTabHistory };
        obj[id] = data;
        setChatTabHistory(obj);
        console.log("fetchChatHistory success");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(chatTabHistory);
  console.log(latestChat);
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
            backgroundColor: ["#80CAFF"],
            height: "40px",
            justifyContent: "space-between",
            width: "310px",
            padding: "8px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to={activeChat ? `/users/${activeChat._id}` : "/users"}>
              <Badge
                badgeContent={0}
                overlap="circular"
                color="success"
                variant="dot"
                showZero
              >
                <Avatar
                  src={activeChat ? activeChat.avatar : ""}
                  sx={{
                    border: "0.1px solid grey",
                  }}
                />
              </Badge>
            </Link>
            <Box ml={"5px"}>
              <Stack direction="row">
                <Link to={activeChat ? `/users/${activeChat._id}` : "/users"}>
                  <Typography>
                    {activeChat ? activeChat.name : ""}{" "}
                    {activeChat ? activeChat.surname : ""}{" "}
                  </Typography>
                </Link>
              </Stack>
              <Stack direction="row" sx={{ fontStyle: "italic" }}>
                {activeChat ? (
                  <Typography variant="body2">active</Typography>
                ) : (
                  <Typography></Typography>
                )}
              </Stack>
            </Box>
          </Box>
          <IconButton
            onClick={handleCloseBox}
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
            height: "280px",
            backgroundColor: "white",
            padding: "8px",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          {chatTabHistory.hasOwnProperty(activeChat._id) &&
            chatTabHistory[activeChat._id].map((message, index) => (
              <Box
                key={index}
                className={
                  currentUser._id === message.sender._id
                    ? "message myMessage"
                    : "message userMessage"
                }
              >
                <Box p={"8px"}>{message.content.text}</Box>
              </Box>
            ))}
        </Box>
        <Box
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            display: "flex",
            backgroundColor: "white",
            height: "40px",
            justifyContent: "stretch",
            padding: "8px",
          }}
        >
          <Box className="messageBoxWrapper">
            <input
              className="messageBoxInput"
              value={text}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
              placeholder="Aa"
            ></input>
          </Box>
          <IconButton onClick={onClickHandler}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ChatWindow;
