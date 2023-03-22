import { Image } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
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
import "./productspage.css";

const ProductDetailPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const params = useParams();
  const dispatch = useDispatch();
  const { productId } = params;
  console.log(product);

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
          marginTop: "2rem",
          display: "flex",
        }}
      >
        <Box className="productImageBox">
          <img
            className="productImage"
            alt="product"
            src={product.mainPicture}
          />
          <Tooltip>
            <IconButton
              className="productImageIcon"
              color="inherit"
              aria-label="add-to-wishlist"
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack className="productContentBox" direction="row">
            <Typography variant="h3">{product.name}</Typography>
            <Chip
              variant="outlined"
              label={product.category}
              sx={{
                justifyContent: "flex-end",
                textAlign: "center",
                bgcolor: "#dbdbdb",
              }}
            ></Chip>
          </Stack>

          <Box>
            <Typography variant="body2" sx={{ text: "ellipsis" }}>
              {product.description}
            </Typography>
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button variant="outlined">ask about product</Button>
              <Button onClick={handleOpen} variant="contained">
                adopt it
              </Button>
              <ProductModal
                open={open}
                handleClose={handleClose}
                handleAdoptProduct={handleAdoptProduct}
              />
            </Stack>
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
