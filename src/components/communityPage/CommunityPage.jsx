import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyNavbar from "../MyNavbar";
import graphic from "../../assets/community.png";

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
      <MyNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">
          welcome to our <br></br>swAPP community!
        </Typography>
        <Box sx={{ marginX: "2rem" }}>
          <img
            className="communityGraphic"
            alt="communityGraphic"
            src={graphic}
          />
        </Box>
      </Box>
      <Box>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Grid
            item
            xs={2}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {users
              ? filteredUsers.slice(3, 9).map((user) => (
                  <Box
                    sx={{
                      width: "200px",
                      height: "200px",
                    }}
                    key={user._id}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: "1",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "1rem",
                      }}
                    >
                      <Avatar
                        sx={{ height: "150px", width: "150px" }}
                        src={user.avatar}
                      />
                      <CardContent>{user.name}</CardContent>
                    </Card>
                  </Box>
                ))
              : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CommunityPage;
