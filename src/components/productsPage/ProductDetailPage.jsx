import { Image } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../MyNavbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductDetailPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [product, setProduct] = useState({});
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch(`${BE_URL}/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.log("error fetching data ... ", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: "1rem",
        }}
      >
        <Box>
          <img alt="product" src={product.mainPicture} />
          <Stack>
            {product.images
              ? product.images.map((image) => <Image src={image} />)
              : null}
          </Stack>
        </Box>
        <Box>
          <Typography variant="body1">{product.category}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h2">{product.name}</Typography>

            <IconButton color="inherit" aria-label="add-to-wishlist">
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ text: "ellipsis" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            sequi alias, quasi perspiciatis pariatur rerum harum error repellat.
            Inventore eaque error ipsa reiciendis magni unde cum earum
            reprehenderit distinctio eligendi.
          </Typography>
          <Typography variant="body2"></Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined">ask about product</Button>
              <Button variant="contained">adopt it</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetailPage;
