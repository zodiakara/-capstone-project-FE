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
  Rating,
  Grid,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyNavbar from "../MyNavbar";
import UploadUserAvatar from "./UploadUserAvatar";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const UserMainPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [products, setProducts] = useState("");
  const [name, setUserName] = useState("");
  const [surname, setUserSurname] = useState("");
  const [birthDate, setUserBirthdate] = useState("");
  const [gender, setUserGender] = useState("");
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
              <Stack direction="row" spacing={4} my={2}>
                <TextField
                  required
                  id="filled-required"
                  label="first name"
                  defaultValue={currentUser.name ? currentUser.name : ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></TextField>
                <TextField
                  required
                  id="filled-required"
                  label="last name"
                  defaultValue={
                    currentUser.surname ? currentUser.surname : surname || ""
                  }
                  onChange={(e) => {
                    setUserSurname(e.target.value);
                  }}
                ></TextField>
              </Stack>
              <Stack direction="row" spacing={4} my={2}>
                <TextField
                  label="Birth date"
                  defaultValue={
                    currentUser.birthDate
                      ? currentUser.birthDate
                      : birthDate || ""
                  }
                  onChange={(e) => {
                    setUserBirthdate(e.target.value);
                  }}
                ></TextField>
                <TextField
                  sx={{ width: "200px" }}
                  select
                  label="Gender"
                  value={currentUser.gender ? currentUser.gender : gender}
                  onChange={(e) => {
                    setUserGender(e.target.value);
                  }}
                >
                  <MenuItem key="Female" value="Female">
                    Female
                  </MenuItem>
                  <MenuItem key="Male" value="Male">
                    Male
                  </MenuItem>
                </TextField>
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
                <TextField label="Street" variant="filled"></TextField>
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
              <UploadUserAvatar currentUser={currentUser} />
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
            // marginX: "1rem",
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
          <Grid
            container
            my={4}
            rowSpacing={4}
            columnSpacing={4}
            sx={
              {
                // display: "flex",
                // justifyContent: "space-around",
                // alignItems: "center",
                // flexWrap: "wrap",
              }
            }
          >
            {products &&
              products.map((product) => (
                <Grid item xs={4} key={product._id}>
                  <Card>
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
                </Grid>
              ))}
          </Grid>
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
          <Typography variant="body1" gutterBottom>
            average score:
            <Rating value={4.4} precision={0.5} onChange="disabled" readOnly />
          </Typography>
          <Card>
            <CardContent>
              <Rating
                value={4.4}
                precision={0.5}
                onChange="disabled"
                readOnly
              />

              <Typography variant="body1">some rate</Typography>
              <Avatar />
              <Typography variant="body2">username</Typography>
              <Typography variant="body2" fontSize="small">
                2022-10-01
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default UserMainPage;
