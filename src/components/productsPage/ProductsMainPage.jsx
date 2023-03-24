import { Badge, BadgeOutlined, Image } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import MyNavbar from "../MyNavbar";
import ProductCard from "./ProductCard";
import clothes from "../../assets/c_clothes.avif";
import kids from "../../assets/c_kids.avif";
import SearchBar from "./SearchBar";
import MyComponent from "./CategoriesContainer";

const ProductsMainPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [fetchedProducts, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const products = fetchedProducts.filter(
    (product) => product.adopted !== true
  );
  const categories = [
    { name: "Clothing", image: { clothes }, color: "#9bd19d" },
    { name: "Toys", image: "", color: "#9e004d" },
    { name: "Household", image: "", color: "#fbae42" },
    { name: "Garden", image: "", color: "#5f9f06" },
    { name: "Pets", image: "", color: "#fc665b" },
    { name: "Other", image: "", color: "#afafaf" },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/products`, config);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.log("error fetching data ... ", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <MyComponent />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {/* <Typography variant="h4">want to contribute?</Typography>
        <Box>
          {userInfo ? (
            <Link to="/product/add">
              <Button variant="contained" color="warning">
                ADD PRODUCT
              </Button>
            </Link>
          ) : (
            <Link to="/register" color="warning">
              <Button>REGISTER</Button>
            </Link>
          )}
        </Box> */}
        <Box sx={{ width: "60%" }}>
          <SearchBar />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* {categories.map((category) => (
          // <Card sx={{ backgroundImage: category.image }}>
          <Chip
            key={category.name}
            variant="outlined"
            label={category.name}
            sx={{
              opacity: "50%",
              margin: "none",
              cursor: "pointer",
              padding: "1rem",
              marginX: "0.5rem",
              textAlign: "center",
              bgcolor: "#5f9f06",

              "&:hover": {
                opacity: "90%",
                textDecoration: "bold",
              },
            }}
          >
            <Typography>{category.name}</Typography>
          </Chip>
          // </Card>
        ))} */}
      </Box>
      <Typography variant="h4">Recently added</Typography>
      <Grid
        container
        sx={{
          marginBottom: "6.5rem",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </Grid>
      <Footer />
    </>
  );
};

export default ProductsMainPage;
