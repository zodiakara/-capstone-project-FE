import {
  Avatar,
  Typography,
  Stack,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyNavbar from "../MyNavbar";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const UserMainPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [products, setProducts] = useState("");
  const getUserProducts = async () => {
    const config = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    try {
      const response = await fetch(
        `${BE_URL}/users/${currentUser._id}/products`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProducts(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUserProducts();
  }, []);
  return (
    <>
      <MyNavbar />
      <Container
        sx={{
          // bgcolor: ["#80CAFF"],
          // borderRadius: "20px",
          marginTop: "2rem",
          padding: "1rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Hello, {currentUser.name}!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              flexGrow: "1",
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                General Information
              </Typography>
              <Stack direction="row" spacing={4}>
                <TextField label="first name" variant="filled"></TextField>
                <TextField label="last name" variant="filled"></TextField>
              </Stack>
              <Stack direction="row" spacing={4}>
                <TextField label="Birthday" variant="filled"></TextField>
                <TextField label="Gender" variant="filled"></TextField>
              </Stack>
              <Stack direction="row" spacing={4}>
                <TextField label="Email" variant="filled"></TextField>
                <TextField label="Phone" variant="filled"></TextField>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h5" gutterBottom>
                Address
              </Typography>
              <Stack direction="row" spacing={4}>
                <TextField label="Address" variant="filled"></TextField>
                <TextField label="Number" variant="filled"></TextField>
              </Stack>
              <Stack direction="row" spacing={4}>
                <TextField label="City" variant="filled"></TextField>
                <TextField label="ZIP" variant="filled"></TextField>
              </Stack>
              <Button variant="outlined">save edit</Button>
            </Box>
          </Box>
          <Box>
            <Stack sx={{ padding: "2em" }}>
              {" "}
              <Avatar
                sx={{ height: "200px", width: "200px" }}
                src={currentUser.avatar}
              ></Avatar>
              <TextField
                label="add bio"
                variant="standard"
                multiline
              ></TextField>
            </Stack>
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
        gutterBottom
      >
        <Box
          sx={{
            bgcolor: ["#80CAFF"],
            borderRadius: "20px",
            padding: "1rem",
            marginX: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" gutterBottom>
              My products
            </Typography>
            <Link to="/product/add">
              <Button variant="outlined">add a new product</Button>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products &&
              products.map((product) => (
                <Card
                  sx={{
                    width: "200px",
                    marginBottom: "1rem",
                    marginX: "0.75rem",
                  }}
                  key={product._id}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="http://source.unsplash.com/random"
                    alt="productImg"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: ["#80CAFF"],
            borderRadius: "20px",
            padding: "1rem",
            marginX: "1rem",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Reviews
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default UserMainPage;
