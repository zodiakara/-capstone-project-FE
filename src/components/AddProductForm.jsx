import { Button, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import graphic from "../assets/undraw_Dreamer_re_9tua.png";

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const currentUser = useSelector((state) => state.auth.userInfo);
  console.log(currentUser._id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      name: productName,
      description: productDescription,
      category: category,
      condition: condition,
    };
    console.log(product);
    addProductAction(product);
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
          noValidate
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
              required
              id="productName"
              label="name"
              variant="filled"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            ></TextField>
            <TextField
              required
              id="productDescription"
              label="description"
              variant="filled"
              multiline
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></TextField>

            <TextField
              required
              id="category"
              label="category"
              variant="filled"
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
