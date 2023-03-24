import { Image } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyNavbar from "../MyNavbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useDispatch, useSelector } from "react-redux";
import { adoptProductAction } from "../../redux/reducers/products/productSliceActions";
import ProductModal from "./ProductModal";
import "./productspage.css";
import SearchBar from "./SearchBar";

const ProductDetailPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const params = useParams();
  const dispatch = useDispatch();
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

  const handleAdoptProduct = () => {
    if (product.owner._id !== currentUser._id) {
      dispatch(
        adoptProductAction({ productId: product._id, userId: currentUser._id })
      ).then(() => {
        setOpen(false);
        setAlert(true);
      });
    } else {
      console.log("you cant adopt your own product idiot");
    }
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
      <SearchBar category={product.category} />
      <Container
        sx={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box className="productImageBox">
          <img
            className="productImage"
            alt="product"
            src={product.mainPicture}
          />{" "}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Stack
              sx={{ justifyContent: "space-between" }}
              className="productContentBox"
              direction="row"
            >
              <Typography variant="h4">{product.name}</Typography>
              <IconButton
                className="productImageIcon"
                color="inherit"
                aria-label="add-to-wishlist"
              >
                <FavoriteBorderIcon />
              </IconButton>
              {/* <Chip
                
                variant="outlined"
                label={product.category}
                sx={{
                  justifyContent: "flex-end",
                  textAlign: "center",
                  bgcolor: "#dbdbdb",
                }}
              ></Chip> */}
            </Stack>
            {product.adopted ? (
              <Typography
                variant="body1"
                color="error"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  fontStyle: "italic",
                }}
              >
                this item is no longer available
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  fontStyle: "italic",
                }}
              >
                added: {new Date(product.createdAt).toUTCString()}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="h6">Description:</Typography>
            <Typography
              variant="body1"
              sx={{ text: "ellipsis", fontStyle: "italic" }}
            >
              {product.description}
            </Typography>

            <Stack
              className="ownerContentBox"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1em",
              }}
            >
              {" "}
              <Typography variant="h6">Meet the owner:</Typography>
              <Link
                to={
                  product.owner ? `/users/${product.owner._id}` : `/community`
                }
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <Avatar
                    sx={{ mr: "0.25em" }}
                    src={product.owner ? product.owner.avatar : ""}
                  />
                  <Box className="userName" sx={{ flexDirection: "column" }}>
                    {" "}
                    <Typography variant="body1">
                      {product.owner ? product.owner.name : null}
                    </Typography>
                    <Typography variant="body1">
                      {product.owner ? product.owner.surname : null}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              {product.adopted ? (
                <ButtonGroup>
                  <Button disabled variant="outlined" color="warning">
                    ask about product
                  </Button>
                  <Button
                    disabled
                    onClick={handleOpen}
                    variant="contained"
                    color="warning"
                  >
                    adopt it
                  </Button>
                </ButtonGroup>
              ) : (
                <>
                  <ButtonGroup>
                    <Button variant="outlined" color="warning">
                      ask about product
                    </Button>
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      color="warning"
                    >
                      adopt it
                    </Button>
                  </ButtonGroup>
                  <ProductModal
                    open={open}
                    handleClose={handleClose}
                    handleAdoptProduct={handleAdoptProduct}
                  />
                </>
              )}
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
