import {
  Alert,
  AlertTitle,
  Avatar,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
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
import ChatWindow from "../messages/ChatWindow";
import { PopperUnstyled } from "@mui/base";

const ProductDetailPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const params = useParams();
  const dispatch = useDispatch();
  const { productId } = params;
  const [activeChat, setActiveChat] = useState({});

  const [popper, setOpenPopper] = useState(false);

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

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenPopper = () => {
    setOpenPopper((prevOpen) => !prevOpen);
    setActiveChat(product.owner);
  };
  const handleClosePopper = (event) => {
    setOpenPopper(false);
    setActiveChat({});
  };

  return (
    <>
      <MyNavbar />
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          marginLeft: "1rem",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Link color="inherit" to="/products">
            Products
          </Link>

          <Link color="inherit" to={`/products/${product.category}`}>
            {product.category}
          </Link>
        </Breadcrumbs>
      </Box>
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
                  <Button disabled variant="contained" color="warning">
                    adopt it
                  </Button>
                </ButtonGroup>
              ) : (
                <>
                  <ButtonGroup>
                    <Button
                      onClick={handleOpenPopper}
                      variant="outlined"
                      color="warning"
                      disabled={currentUser ? false : true}
                    >
                      ask about product
                    </Button>
                    <Button
                      onClick={handleOpenModal}
                      variant="contained"
                      color="warning"
                      disabled={currentUser ? false : true}
                    >
                      adopt it
                    </Button>
                  </ButtonGroup>
                  <ProductModal
                    open={open}
                    handleClose={handleCloseModal}
                    handleAdoptProduct={handleAdoptProduct}
                  />
                  <PopperUnstyled
                    open={popper}
                    style={{
                      position: "fixed",
                      bottom: 0,
                      right: "2.5rem",
                      top: "unset",
                      left: "unset",
                    }}
                  >
                    <ChatWindow
                      handleClosePopper={handleClosePopper}
                      activeChat={activeChat}
                      setActiveChat={setActiveChat}
                    />
                  </PopperUnstyled>
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
