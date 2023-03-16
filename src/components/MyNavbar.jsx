import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AllInclusive } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/reducers/auth/userAuthSlice";
import { Link, useNavigate } from "react-router-dom";

const pages = ["Home", "Products", "Community", "Our Goal"];
const settings = ["My profile", "Profile settings", "Logout"];

function MyNavbar() {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static" sx={{ bgcolor: ["#80CAFF"], color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AllInclusive sx={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            s<span style={{ letterSpacing: ".3rem" }}>wapp</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/">
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/products">
                  <Typography textAlign="center">Products</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/community">
                  {" "}
                  <Typography textAlign="center">Community</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/info">
                  {" "}
                  <Typography textAlign="center">Our Goals</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AllInclusive sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/">
                <Typography textAlign="center">Home</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/products">
                <Typography textAlign="center">Products</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/community">
                {" "}
                <Typography textAlign="center">Community</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/info">
                {" "}
                <Typography textAlign="center">Our Goals</Typography>
              </Link>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src={currentUser.avatar} />
                </IconButton>
              </Tooltip>
            ) : (
              <Link to="/login">
                <Button variant="outlined">LOGIN</Button>
              </Link>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/user">
                  <Typography textAlign="center">My profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem component="div" onClick={handleCloseUserMenu}>
                <Link to="/user_edit">
                  <Typography textAlign="center">Profile settings</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/">
                  <Typography onClick={handleLogout} textAlign="center">
                    Logout
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyNavbar;
