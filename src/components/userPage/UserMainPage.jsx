import { Avatar, Typography, Stack, TextField } from "@mui/material";
import { Box, width } from "@mui/system";
import { useSelector } from "react-redux";

const UserMainPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  return (
    <>
      <Box></Box>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo accusamus,
        neque, dolor eum voluptas doloremque deserunt suscipit doloribus vitae
        soluta optio provident. Minima qui error impedit deleniti voluptatibus,
        nobis optio!
      </Typography>
      <Typography variant="h4">Hello, {currentUser.name}!</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            General Information
          </Typography>
          <Stack direction="row" spacing={4}>
            <TextField label="first name" variant="filled"></TextField>
            <TextField
              label="last name"
              variant="filled"
              color="success"
            ></TextField>
          </Stack>
          <Stack direction="row" spacing={4}>
            <TextField label="Birthday" variant="filled"></TextField>
            <TextField label="Gender" variant="filled"></TextField>
          </Stack>
          <Stack direction="row" spacing={4}>
            <TextField label="Email" variant="filled"></TextField>
            <TextField label="Phone" variant="filled"></TextField>
          </Stack>
          <Typography variant="h5" gutterBottom>
            Address
          </Typography>
          <Stack spacing={2}>
            <TextField label="Name" variant="standard"></TextField>
            <TextField
              label="Surname"
              variant="filled"
              color="success"
            ></TextField>
            <TextField label="Surname" variant="outlined"></TextField>
            <TextField label="email" variant="outlined"></TextField>
            <TextField label="add bio" variant="outlined"></TextField>
          </Stack>
        </Box>
        <Stack sx={{ padding: "2em" }}>
          {" "}
          <Avatar
            sx={{ height: "200px", width: "200px" }}
            src={currentUser.Avatar}
          ></Avatar>
          <TextField label="add bio" variant="standard" multiline></TextField>
        </Stack>
      </Box>
    </>
  );
};

export default UserMainPage;
