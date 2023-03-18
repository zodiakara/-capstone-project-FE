import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UploadUserAvatar from "./UploadUserAvatar";

const UserEditPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [name, setUserName] = useState("");
  const [surname, setUserSurname] = useState("");
  const [birthDate, setUserBirthdate] = useState("");
  const [gender, setUserGender] = useState("");

  return (
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
            <TextField label="add bio" variant="standard" multiline></TextField>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default UserEditPage;
