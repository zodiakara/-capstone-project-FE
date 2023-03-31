import { Badge, BadgeOutlined, Image } from "@mui/icons-material";
import {
  Breadcrumbs,
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
import SearchBar from "./SearchBar";
import MyComponent from "./CategoriesContainer";

const ProductsMainPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [fetchedProducts, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const products = fetchedProducts.filter(
    (product) => product.adopted !== true
  );

  console.log(filteredProducts);
  const handleCategory = (category) => {
    setSelectedCategory(category);
    getFilteredProducts(selectedCategory);
  };
  console.log(selectedCategory);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getFilteredProducts();
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
  const getFilteredProducts = async (selectedCategory) => {
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };

      const response = await fetch(
        `${BE_URL}/products/search/?category=/${selectedCategory}/i&adopted=false`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        setFilteredProducts(data);
      }
    } catch (error) {
      console.log("error fetching data ... ", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <MyComponent onItemClick={handleCategory} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <SearchBar />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      ></Box>
      <Box>
        {selectedCategory ? (
          <>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/">
                Home
              </Link>
              <Link color="inherit" to="/products">
                Products
              </Link>

              <Link color="inherit" to={`/products/${selectedCategory}`}>
                {selectedCategory ? selectedCategory : null}
              </Link>
            </Breadcrumbs>
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </Grid>
          </>
        ) : (
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ProductsMainPage;
