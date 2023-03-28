import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Typography,
  Card,
  Avatar,
  CardContent,
  Grid,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";

function UserAvatarSlider({ users }) {
  const chunkSize = 6;

  const chunkArray = (array, chunkSize) => {
    const numberOfChunks = Math.ceil(array.length / chunkSize);
    return [...Array(numberOfChunks)].map((value, index) => {
      return array.slice(index * chunkSize, (index + 1) * chunkSize);
    });
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
      }}
      maxWidth
    >
      <Carousel>
        {chunkArray(users, chunkSize).map((chunk) => (
          <Grid
            item
            xs={12}
            key={chunk.index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {chunk.map((user) => (
              <Grid item xs={12} md={4} maxWidth>
                <Card
                  key={user._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "1",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    margin: "0.5rem",
                    opacity: "90%",
                    "&:hover": {
                      opacity: "100%",
                      textDecoration: "underline",
                      fontStyle: "bold",
                      scale: "1.03",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Link to={`/users/${user._id}`}>
                    <Avatar
                      sx={{ height: "150px", width: "150px", border: "1px" }}
                      src={user.avatar}
                    />
                  </Link>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{user.name}</Typography>
                    <Typography>{user.surname}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </Container>
  );
}

export default UserAvatarSlider;
