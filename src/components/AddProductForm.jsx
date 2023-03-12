import { Button, TextField, Typography, FormControl } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import graphic from "../assets/undraw_Dreamer_re_9tua.png";

const errorMessages = {
  name: "Product name should not be empty.",
  description: "Description field should be at least 50 characters long.",
  category: "Please select a category.",
};

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [errors, setErrors] = useState({
    productName: false,
    productDescription: false,
    category: false,
  });

  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const currentUser = useSelector((state) => state.auth.userInfo);
  console.log(currentUser._id);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!(productName === "")) setErrors({ ...errors, productName: true });
    if (!(productDescription.length >= 50))
      setErrors({ ...errors, productDescription: true });
    if (!(category === "")) setErrors({ ...errors, category: true });

    const product = {
      name: productName,
      description: productDescription,
      category: category,
      condition: condition,
    };

    debugger;

    if (!Object.values(errors).includes(true)) addProductAction(product);
  };

  const addProductAction = async (product) => {
    const productToAdd = {
      ...product,
      owner: currentUser._id,
    };

    try {
      const config = {
        method: "POST",
        body: JSON.stringify(productToAdd),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      await fetch(`${BE_URL}/products`, config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
          }}
        >
          <Link to="/user">
            <Button variant="text">back to user page</Button>
          </Link>
          <Button variant="text">add another one</Button>
        </Box>
        <Typography variant="h5" gutterBottom>
          add a new product:
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Stack spacing={4}>
            <TextField
              error={errors.productName}
              required
              id="productName"
              label="name"
              variant="filled"
              helperText={errors.productName ? errorMessages.productName : ""}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            ></TextField>
            <TextField
              error={errors.productDescription}
              required
              id="productDescription"
              label="description"
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
              error={errors.category}
              required
              id="category"
              label="category"
              variant="filled"
              helperText={errors.category ? errorMessages.category : ""}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            ></TextField>
            <TextField
              id="condition"
              label="condition"
              variant="filled"
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            ></TextField>
          </Stack>
          <Button type="submit" variant="outlined">
            add
          </Button>
        </Box>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img className="mainGraphic" alt="" src={graphic} />
      </Box>
    </>
  );
};

export default AddProductForm;
