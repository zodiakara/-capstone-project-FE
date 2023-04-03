import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import getUsers from "./api/getUsers";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import MessageListUser from "./MessageListUser";
import { messagesActions } from "../../redux/reducers/messages/messagesSlice";

const MessageList = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const closeMessageList = () => {
    dispatch(messagesActions.closeMessageList());
  };

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <Box
      className="usersListWindow"
      sx={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        boxShadow: "1px -3px 13px -1px rgba(195, 195, 195, 1)",
        overflow: "hidden",
        backgroundColor: "white",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          borderBottom: "0.1px solid lightgrey",
          height: "40px",
          justifyContent: "space-between",
          width: "250px",
          padding: "8px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge
            badgeContent={0}
            overlap="circular"
            color="success"
            variant="dot"
            showZero
          >
            <Link to="/user">
              <Avatar
                src={currentUser.avatar}
                sx={{
                  border: "0.1px solid grey",
                }}
              />{" "}
            </Link>
          </Badge>

          <Typography variant="h6" p={"10px"}>
            Messaging
          </Typography>
        </Box>
        <IconButton onClick={closeMessageList}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: "500px",
        }}
      >
        {users
          .filter((user) => user._id !== currentUser._id)
          .map((user) => (
            <MessageListUser user={user} />
          ))}
      </Box>
      <Box sx={{ height: "25px" }}></Box>
    </Box>
  );
};

export default MessageList;
