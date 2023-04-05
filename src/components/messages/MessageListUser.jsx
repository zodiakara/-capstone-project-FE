import { Avatar, Badge, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { messagesActions } from "../../redux/reducers/messages/messagesSlice";
import { useDispatch, useSelector } from "react-redux";

const MessageListUser = ({ user }) => {
  function createRoomId(user1, user2) {
    if (user1 < user2) return `${user1},${user2}`;
    else return `${user2},${user1}`;
  }
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.userInfo._id);
  const openChatbox = () => {
    let editableUser = { user };
    console.log(editableUser);
    let room = createRoomId(editableUser.user._id, currentUserId);
    editableUser.roomId = room;
    dispatch(messagesActions.setActiveChat(editableUser));
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
