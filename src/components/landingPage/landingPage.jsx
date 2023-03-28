import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Container, Box } from "@mui/system";
import MyNavbar from "../MyNavbar";
import graphic from "../../assets/undraw_Connection_re_lcud.png";
import "./homepage.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";

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
  const getAllProducts = async () => {
    const response = await fetch(`${BE_URL}/products`);
    if (response.ok) {
      const data = await response.json();
      setAllProducts(data);
    }
  };

  const products = allProducts.filter((product) => product.adopted === false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const numberOfChunks = Math.ceil(array.length / chunkSize);
    return [...Array(numberOfChunks)].map((value, index) => {
      return array.slice(index * chunkSize, (index + 1) * chunkSize);
    });
  };

  const currentUser = useSelector((state) => state.auth.userInfo);

  const welcomeHeader = currentUser ? (
    <>
      <Typography
        variant="h4"
        noWrap
        component="div"
        gutterBottom
        sx={welcomeHeaderStyles}
      >
        Hello {currentUser.name},<br></br> Welcome to swAPP!!
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
        <Box
          sx={{
            // bgcolor: ["#80CAFF"],
            // borderRadius: "20px",
            padding: "1rem",
          }}
        >
          {welcomeHeader}
        </Box>
        <Box>
          <img className="mainGraphic" alt="" src={graphic} />
        </Box>
      </Container>
      <Container maxWidth>
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
            <Typography variant="h4">Recently added:</Typography>
            <Link to="/products">
              <Typography variant="h6"> Browse Products</Typography>
            </Link>
          </Stack>
          <Carousel>
            {chunkArray(products.reverse().slice(0, 12), 4).map((chunk) => (
              <Grid
                item
                xs={12}
                key={chunk.index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {chunk.map((product) => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexGrow: "1",
                    }}
                  >
                    <Card sx={{ width: "350px" }}>
                      <Link to={`/products/${product._id}`}>
                        <CardMedia
                          sx={{ position: "relative" }}
                          component="img"
                          height="200"
                          image={product.mainPicture}
                          alt="product"
                          subheader={product.category}
                        />
                      </Link>
                      <Chip
                        sx={{
                          position: "absolute",
                          marginLeft: "5px",
                          top: "5px",
                          zIndex: "1",
                          bgcolor: ["#5f9f06"],
                        }}
                        label={product.category}
                      ></Chip>
                      <CardContent>
                        <Typography variant="body1">{product.name}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Carousel>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
