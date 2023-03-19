import { Image } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
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
import { useDispatch, useSelector } from "react-redux";
import { adoptProductAction } from "../../redux/reducers/products/productSliceActions";
import ProductModal from "./ProductModal";

const ProductDetailPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const params = useParams();
  const dispatch = useDispatch();
  const { productId } = params;
  console.log(open);

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
  console.log(product);

  const handleAdoptProduct = () => {
    dispatch(
      adoptProductAction({ productId: product._id, userId: currentUser._id })
    ).then(() => {
      setOpen(false);
      setAlert(true);
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
              <Button onClick={handleOpen} variant="contained">
                adopt it
              </Button>
              <ProductModal
                open={open}
                handleClose={handleClose}
                handleAdoptProduct={handleAdoptProduct}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      {alert ? (
        <Alert onClose={() => setAlert(false)} severity="success">
          <AlertTitle>Success!!</AlertTitle>Congratulations, You've succesfully
          adopted a product with id "{product._id}"!
        </Alert>
      ) : null}
    </>
  );
};

export default ProductDetailPage;
