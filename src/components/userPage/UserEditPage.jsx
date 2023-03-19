import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  updateUserInfo,
} from "../../redux/reducers/auth/userAuthActions";

import UploadUserAvatar from "./UploadUserAvatar";

const UserEditPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [name, setUserName] = useState("");
  const [surname, setUserSurname] = useState("");
  const [birthDate, setUserBirthdate] = useState("");
  const [gender, setUserGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(null);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");

  const handleUserUpdate = () => {
    const userObject = {};
    if (name) {
      userObject.name = name;
    }
    if (surname) {
      userObject.surname = surname;
    }
    if (birthDate) {
      userObject.birthDate = birthDate;
    }
    if (gender) {
      userObject.gender = gender;
    }
    if (phone) {
      userObject.phone = phone;
    }
    if (street) {
      userObject.street = street;
    }
    if (number) {
      userObject.number = number;
    }
    if (city) {
      userObject.City = city;
    }
    if (zip) {
      userObject.ZIP = zip;
    }
    if (bio) {
      userObject.bio = bio;
    }
    if (userObject) {
      dispatch(
        updateUserInfo({ userId: currentUser._id, data: userObject })
      ).then(() => {
        dispatch(getCurrentUser());
      });
    }
  };

  return (
    <Container
      sx={{
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
                defaultValue={currentUser.name ? currentUser.name : name || ""}
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
            <Stack direction="row" spacing={4} my={2}>
              <TextField
                label="Email"
                defaultValue={
                  currentUser.email ? currentUser.email : email || ""
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
              <TextField
                label="Phone"
                defaultValue={
                  currentUser.phone ? currentUser.phone : phone || ""
                }
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></TextField>
            </Stack>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Address
            </Typography>
            <Stack direction="row" spacing={4} my={2}>
              <TextField
                label="Street"
                v
                defaultValue={
                  currentUser.address.street
                    ? currentUser.address.street
                    : street || ""
                }
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              ></TextField>
              <TextField
                label="Number"
                defaultValue={
                  currentUser.address.number
                    ? currentUser.address.number
                    : number || ""
                }
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              ></TextField>
            </Stack>
            <Stack direction="row" spacing={4} my={2}>
              <TextField
                label="City"
                defaultValue={
                  currentUser.address.City
                    ? currentUser.address.City
                    : city || ""
                }
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></TextField>
              <TextField
                label="ZIP"
                defaultValue={
                  currentUser.address.zip ? currentUser.address.zip : zip || ""
                }
                onChange={(e) => {
                  setZip(e.target.value);
                }}
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
              my={2}
            >
              <Button onClick={handleUserUpdate} variant="outlined">
                save edit
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box>
          <Stack sx={{ padding: "2em" }}>
            {" "}
            <UploadUserAvatar currentUser={currentUser} />
            <TextField
              label="add bio"
              variant="standard"
              defaultValue={currentUser ? currentUser.bio : bio || ""}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              multiline={3}
            ></TextField>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default UserEditPage;
