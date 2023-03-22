import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import classes from "./MyNavbar.module.css";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link
        className={classes.footer}
        color="inherit"
        to="https://www.linkedin.com/in/agata-ormi%C5%84ska-b79271174/"
      >
        agata ormińska
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Container
      maxWidth
      className="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          This app has been designed as Epicode bootcamp graduation project.
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Footer;
