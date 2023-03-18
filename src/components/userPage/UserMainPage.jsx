import {
  Avatar,
  Typography,
  Stack,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Grid,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyNavbar from "../MyNavbar";
import { ArrowRightAltSharp } from "@mui/icons-material";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const UserMainPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [fetchedProducts, setProducts] = useState([]);
  const products = fetchedProducts.filter(
    (product) => product.adopted !== true
  );
  const history = fetchedProducts.filter((product) => product.adopted === true);
  console.log(history);

  const getUserProducts = async () => {
    const config = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    try {
      const response = await fetch(
        `${BE_URL}/users/${currentUser._id}/products`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUserProducts();
  }, []);

  return (
    <>
      <MyNavbar />

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
        gutterBottom
      >
        <Box
          sx={{
            bgcolor: ["#80CAFF"],
            borderRadius: "20px",
            padding: "1rem",
            // marginX: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" gutterBottom>
              My products
            </Typography>
            <Link to="/product/add">
              <Button variant="outlined">add a new product</Button>
            </Link>
          </Box>
          <Grid
            container
            my={4}
            rowSpacing={4}
            columnSpacing={4}
            sx={
              {
                // display: "flex",
                // justifyContent: "space-around",
                // alignItems: "center",
                // flexWrap: "wrap",
              }
            }
          >
            {products &&
              products.map((product) => (
                <Grid item xs={4} key={product._id}>
                  <Card>
                    <Link to={`/products/${product._id}`}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.mainPicture}
                        alt="productImg"
                      />
                    </Link>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box
          sx={{
            bgcolor: ["#80CAFF"],
            borderRadius: "20px",
            padding: "1rem",
            marginX: "1rem",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Reviews
          </Typography>
          <Typography variant="body1" gutterBottom>
            average score:
            <Rating value={4.4} precision={0.5} onChange="disabled" readOnly />
          </Typography>
          <Card>
            <CardContent>
              <Rating
                value={4.4}
                precision={0.5}
                onChange="disabled"
                readOnly
              />

              <Typography variant="body1">some rate</Typography>
              <Avatar />
              <Typography variant="body2">username</Typography>
              <Typography variant="body2" fontSize="small">
                2022-10-01
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default UserMainPage;
