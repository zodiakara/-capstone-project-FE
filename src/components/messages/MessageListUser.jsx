import { Avatar, Badge, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { messagesActions } from "../../redux/reducers/messages/messagesSlice";
import { useDispatch } from "react-redux";

const MessageListUser = ({ user }) => {
  const dispatch = useDispatch();
  const openChatbox = () => {
    dispatch(messagesActions.setActiveChat(user));
    dispatch(messagesActions.openMessageBox());
  };

  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: "solid lightgrey 0.1px",
        padding: "8px",
      }}
    >
      <Box>
        {" "}
        <Link to={`/users/${user._id}`}>
          {" "}
          <Badge
            badgeContent={0}
            overlap="circular"
            color="success"
            variant="dot"
            showZero={user.active ? true : false}
          >
            <Avatar src={user.avatar} sx={{ width: "48px", height: "48px" }} />{" "}
          </Badge>
        </Link>
      </Box>
      <Box onClick={openChatbox}>
        <Box p={"4px"} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ pr: "4px" }} variant="body2">
            {user.name} {user.surname}
          </Typography>{" "}
          <Typography variant="subtitle2" color="gray">
            {" "}
            latest chat goes here ...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageListUser;
