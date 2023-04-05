import { Button, Stack, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import MyNavbar from "../MyNavbar";
import graphic from "../../assets/undraw_Connection_re_lcud.png";
import "./homepage.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductsCarousel from "./components/ProductsCarousel";

const welcomeHeaderStyles = {
  display: { xs: "flex" },
  flexGrow: 1,
  fontFamily: "monospace",
  fontWeight: 700,
  justifyContent: "center",
  color: "inherit",
  textDecoration: "none",
};

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const currentUser = useSelector((state) => state.auth.userInfo);

  const getAllProducts = async () => {
    const response = await fetch(`${BE_URL}/products`);
    if (response.ok) {
      const data = await response.json();
      setAllProducts(data);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const products = allProducts.filter((product) => product.adopted === false);

  const welcomeHeader = currentUser ? (
    <>
      <Typography
        variant="h4"
        noWrap
        component="div"
        gutterBottom
        sx={welcomeHeaderStyles}
      >
        Hello {currentUser.name},<br /> Welcome to swAPP!!
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/product/add">
          <Button
            // color="warning"
            // variant="outlined"
            sx={{
              color: "black",
              textDecoration: "none",
              bgcolor: ["#80CAFF"],

              borderRadius: "50px",
              padding: "1rem",
              width: "200px",
            }}
          >
            Add product
          </Button>
        </Link>
        <Link to="/info">
          <Typography>Check how it works</Typography>
        </Link>
      </Box>
    </>
  ) : (
    <>
      <Typography
        variant="h4"
        noWrap
        component="div"
        gutterBottom
        sx={welcomeHeaderStyles}
      >
        {" "}
        <br></br>
        Welcome to swAPP!!
      </Typography>
      {/* <Typography variant="body2" sx={{ textDecoration: "justify" }}>
        Swapp is a mobile application that aims to promote sustainability and
        community building by allowing users to swap products in various
        categories while also providing a platform for social interaction and
        engagement.
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/register">
          <Button
            // color="warning"
            // variant="outlined"
            sx={{
              color: "black",
              textDecoration: "none",
              bgcolor: ["#80CAFF"],
              borderRadius: "50px",
              padding: "1rem",
              width: "200px",
            }}
          >
            Sign Up
          </Button>
        </Link>

        <Link to="/info">
          <Typography>Check how it works</Typography>
        </Link>
      </Box>
    </>
  );

  return (
    <>
      <MyNavbar />
      <Container
        maxWidth
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          bgcolor: "white",
          marginTop: "0",
        }}
      >
        {" "}
        <Box p={"1rem"}>{welcomeHeader}</Box>
        <Box>
          <img className="mainGraphic" alt="" src={graphic} />
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            marginX: "2rem",
            marginY: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            maxWidth
            sx={{
              marginY: "0.5rem",
              marginX: "3rem",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="h6">Recently added:</Typography>
            <Link to="/products">
              <Typography variant="h6">Browse Products</Typography>
            </Link>
          </Stack>
          <ProductsCarousel products={products} />
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
