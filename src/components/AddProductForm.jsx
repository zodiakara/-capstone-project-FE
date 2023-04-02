import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendProductImage } from "../redux/reducers/products/productSliceActions";
import { productActions } from "../redux/reducers/products/productsSlice";
import MyNavbar from "./MyNavbar";

const errorMessages = {
  name: "Product name should not be empty.",
  description: "Description field should be at least 50 characters long.",
};

const categories = [
  "Clothing",
  "Kids Clothing",
  "Toys",
  "Household",
  "Electronics",
  "Garden",
  "Pets",
  "Other",
];

const conditions = ["Used", "Slightly Used", "New"];
const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({
    productName: false,
    productDescription: false,
  });

  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);
  const productImage = useSelector((state) => state.product.productImage);

  const clearTheForm = function () {
    setProductName("");
    setDescription("");
    setCategory("");
    setCondition("");
    dispatch(productActions.removeProductImage());
    handleClick();
  };

  const handleSubmit = (event, userId) => {
    event.preventDefault();

    const product = {
      name: productName,
      description: productDescription,
      category: category,
      condition: condition,
      owner: userId,
    };

    addProductAction(product).then(() => {
      clearTheForm();
    });
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addProductAction = async (product) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(product),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/products`, config);
      if (response.ok) {
        const data = await response.json();
        const productId = data._id;
        if (productId) {
          if (productImage) {
            console.log(productImage);
            dispatch(
              sendProductImage({ productId: productId, image: productImage })
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MyNavbar />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          component="form"
          onSubmit={(event) => handleSubmit(event, currentUser._id)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Stack spacing={4}>
            <Typography
              sx={{ marginTop: "1em", textAlign: "center" }}
              variant="h5"
            >
              add a new product:
            </Typography>
            <TextField
              error={errors.productName}
              required
              id="productName"
              label="name"
              variant="filled"
              value={productName}
              helperText={errors.productName ? errorMessages.productName : ""}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              inputProps={{ maxLength: 70 }}
            ></TextField>
            <TextField
              error={errors.productDescription}
              required
              id="productDescription"
              label="description"
              value={productDescription}
              variant="filled"
              multiline
              helperText={
                errors.productDescription
                  ? errorMessages.productDescription
                  : ""
              }
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></TextField>

            <TextField
              required
              select
              label="Select product category"
              variant="filled"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select product condition"
              variant="filled"
              value={condition}
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            >
              {" "}
              {conditions.map((condition) => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="outlined">
              add product
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="success" sx={{ width: "100%" }}>
                Product successfully added!
              </Alert>
            </Snackbar>
          </Stack>
        </Box>
        <Box sx={{ marginX: "2rem" }}>
          <input
            accept="image/*"
            id="addPicture"
            className="file-input"
            single
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];

              dispatch(productActions.addProductImage(file));
            }}
          ></input>
          <label htmlFor="addPicture">
            <Box
              sx={{
                "&:hover": {
                  opacity: "40%",
                },
              }}
            >
              <img
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                alt="product"
                src={
                  productImage
                    ? URL.createObjectURL(productImage)
                    : "https://via.placeholder.com/300x300"
                }
              />
            </Box>
          </label>
        </Box>
      </Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginY: "1em" }}
      ></Box>
    </>
  );
};

export default AddProductForm;
