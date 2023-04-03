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
import { Link, NavLink } from "react-router-dom";
import { productActions } from "../redux/reducers/products/productsSlice";
import { Badge } from "@mui/material";
import { PopperUnstyled } from "@mui/base";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import classes from "./MyNavbar.module.css";
import MessageList from "./messages/MessageList";
import { useState } from "react";
import { messagesActions } from "../redux/reducers/messages/messagesSlice";

function MyNavbar() {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [messages, setMessages] = useState(false);
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.messages.messageList);
  const handleOpenMessages = () => {
    // dispatch(messagesActions.openMessageBox)
    setMessages((prevOpen) => !prevOpen);
  };

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
    dispatch(productActions.removeProductImage());
  };

  return (
    <AppBar
      className={classes.navbar}
      position="sticky"
      sx={{ bgcolor: ["#80CAFF"], color: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AllInclusive sx={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
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
              className={classes.smallToolbar}
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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <Typography textAlign="center">Home</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <Typography textAlign="center">Products</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to="/community"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  {" "}
                  <Typography textAlign="center">Community</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to="/info"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  {" "}
                  <Typography textAlign="center">Our Goals</Typography>
                </NavLink>
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <Typography textAlign="center">Home</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <Typography textAlign="center">Products</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {" "}
                <Typography textAlign="center">Community</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink
                to="/info"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {" "}
                <Typography textAlign="center">Our Goals</Typography>
              </NavLink>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                  className="notificationsIcon"
                  onClick={handleOpenMessages}
                >
                  <Badge badgeContent={0} color="primary">
                    <MailOutlineIcon />
                  </Badge>
                  <PopperUnstyled
                    style={{
                      position: "fixed",
                      bottom: 0,
                      right: "1.5rem",
                      top: "unset",
                      left: "unset",
                    }}
                    open={messages}
                  >
                    <MessageList />
                  </PopperUnstyled>
                </IconButton>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                    <Avatar
                      alt=""
                      src={currentUser.avatar}
                      sx={{
                        border: "0.1px solid grey",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Link to="/login">
                <Button
                  className={classes.btnStyle}
                  color="warning"
                  variant="contained"
                >
                  LOGIN
                </Button>
              </Link>
            )}

            <Menu
              className={classes.smallToolbar}
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
