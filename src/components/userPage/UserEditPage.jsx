import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import MyNavbar from "../MyNavbar";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import {
  getCurrentUser,
  updateUserInfo,
} from "../../redux/reducers/auth/userAuthActions";

import UploadUserAvatar from "./UploadUserAvatar";
import { Link } from "react-router-dom";

const UserEditPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const [userForm, setForm] = useState({
    name: "",
    surname: "",
    birthDate: "",
    gender: "",
    bio: "",
  });
  const [userAddress, setAdress] = useState({
    street: "",
    number: "",
    city: "",
    zip: "",
  });

  const handleUserUpdate = (e) => {
    setForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddressUpdate = (e) => {
    setAdress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };

  const userObject = { ...userForm, address: { ...userAddress } };
  console.log(userObject);

  const sendUserUpdate = () => {
    dispatch(
      updateUserInfo({ userId: currentUser._id, data: userObject })
    ).then(() => {
      dispatch(getCurrentUser());
    });
  };

  return (
    <>
      <MyNavbar />
      <Container
        sx={{
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginY: "1em" }}
          color="text.secondary"
        >
          Hello, {currentUser.name}! Change the fields You'd like to update and
          save changes by clicking the button below. <br></br>Here You can also
          update Your avatar or write Your bio! It can attract more swAPP users
          to Your page.
        </Typography>
        <Box
          className="mainBox"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            // sx={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   flexGrow: "1",
            // }}
            sx={{
              padding: "1rem",
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
                  defaultValue={currentUser.name}
                  name="name"
                  onChange={handleUserUpdate}
                ></TextField>
                <TextField
                  required
                  id="filled-required"
                  label="last name"
                  defaultValue={currentUser.surname}
                  name="surname"
                  onChange={handleUserUpdate}
                ></TextField>
              </Stack>
              <Stack direction="row" spacing={4} my={2}>
                <TextField
                  label="Birth date"
                  defaultValue={currentUser.birthDate}
                  name="birthDate"
                  onChange={handleUserUpdate}
                ></TextField>
                <TextField
                  sx={{ width: "214px" }}
                  select
                  label="Gender"
                  value={userForm.gender}
                  name="gender"
                  onChange={handleUserUpdate}
                >
                  <MenuItem key="Female" value="Female">
                    Female
                  </MenuItem>
                  <MenuItem key="Male" value="Male">
                    Male
                  </MenuItem>
                </TextField>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h5" gutterBottom>
                Address
              </Typography>
              <Stack direction="row" spacing={4} my={2}>
                <TextField
                  label="Street"
                  defaultValue={currentUser.address.street}
                  name="street"
                  onChange={handleAddressUpdate}
                ></TextField>
                <TextField
                  label="Number"
                  defaultValue={currentUser.address.number}
                  name="number"
                  onChange={handleAddressUpdate}
                ></TextField>
              </Stack>
              <Stack direction="row" spacing={4} my={2}>
                <TextField
                  label="City"
                  defaultValue={currentUser.address.City}
                  name="city"
                  onChange={handleAddressUpdate}
                ></TextField>
                <TextField
                  label="ZIP"
                  defaultValue={currentUser.address.zip}
                  name="zip"
                  onChange={handleAddressUpdate}
                ></TextField>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                direction="row"
                spacing={4}
              >
                <Button
                  onClick={sendUserUpdate}
                  variant="outlined"
                  className="btnStyle"
                >
                  save edit
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "flex-start",
              padding: "1rem",
              flexDirection: "column",
            }}
          >
            <Link to="/user">
              <Tooltip title="back to user page" placement="right">
                <IconButton>
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Stack sx={{ marginTop: "0.5em" }}>
              {" "}
              <UploadUserAvatar currentUser={currentUser} />
              <TextField
                label="bio"
                variant="standard"
                defaultValue={currentUser.bio}
                onChange={handleUserUpdate}
                multiline={3}
              ></TextField>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserEditPage;
