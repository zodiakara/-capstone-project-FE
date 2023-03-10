import { Button, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import MyNavbar from "../MyNavbar";
import graphic from "../../assets/undraw_Connection_re_lcud.png";
import "./homepage.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const currentUser = useSelector((state) => state.auth.userInfo);

  return (
    <>
      <MyNavbar />;
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {currentUser.name ? (
            <Typography
              variant="h3"
              noWrap
              component="div"
              gutterBottom
              sx={{
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                justifyContent: "center",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Hello {currentUser.name}!!
            </Typography>
          ) : (
            <Typography
              variant="h3"
              noWrap
              component="div"
              gutterBottom
              sx={{
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                justifyContent: "center",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Welcome to swAPP!!
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            {currentUser.name ? (
              <>
                <Link to="/products">
                  <Button
                    disableRipple
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      bgcolor: ["#80CAFF"],
                      borderRadius: "50px",
                      padding: "1rem",
                    }}
                  >
                    Browse Products
                  </Button>
                </Link>
                <Link to="/user">
                  <Button
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      bgcolor: ["#80CAFF"],
                      borderRadius: "50px",
                      padding: "1rem",
                    }}
                  >
                    Go to profile
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/products">
                  <Button
                    disableRipple
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      bgcolor: ["#80CAFF"],
                      borderRadius: "50px",
                      padding: "1rem",
                    }}
                  >
                    Browse Products
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      bgcolor: ["#80CAFF"],
                      borderRadius: "50px",
                      padding: "1rem",
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
        <Box>
          <img className="mainGraphic" alt="" src={graphic} />
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
