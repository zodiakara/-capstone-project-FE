import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import graphic from "../assets/undraw_Dreamer_re_9tua.png";

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
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({
    productName: false,
    productDescription: false,
  });

  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const currentUser = useSelector((state) => state.auth.userInfo);

  // useEffect(() => {
  //   clearTheForm();
  // }, [submit]);

  const clearTheForm = function () {
    setProductName("");
    setDescription("");
    setCategory("");
    setCondition("");
    setSubmit(false);
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
    // .then(() => {
    //   clearTheForm();
    // });
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
            <Button variant="text">go to user page</Button>
          </Link>
          <Link to="/products">
            <Button variant="text">go to products</Button>
          </Link>
        </Box>
        <Typography variant="h5" gutterBottom>
          add a new product:
        </Typography>
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
