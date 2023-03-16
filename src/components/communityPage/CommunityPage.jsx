import { List } from "@mui/icons-material";
import { Box, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CommunityPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [users, setUsers] = useState([]);
  const filteredUsers = users.filter((user) => user._id !== currentUser._id);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/users`, config);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {}
  };

  return (
    <>
      <header>aaaaaa</header>

      {users
        ? filteredUsers.map((user) => (
            <Box key={user._id}>
              {user.name} {user.surname}
            </Box>
          ))
        : null}
    </>
  );
};

export default CommunityPage;
