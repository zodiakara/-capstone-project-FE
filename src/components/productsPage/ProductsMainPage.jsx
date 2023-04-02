import { Breadcrumbs, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyNavbar from "../MyNavbar";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import CategoriesContainer from "./CategoriesContainer";

import getFilteredProducts from "./api/getFilteredProducts";
import getAllProducts from "./api/getAllProducts";

const ProductsPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [fetchedProducts, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const products = fetchedProducts.filter(
    (product) => product.adopted !== true
  );

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getFilteredProducts(category, setFilteredProducts);
  };

  return (
    <>
      <MyNavbar />
      <CategoriesContainer onItemClick={handleCategoryClick} />
      <SearchBar />
      <Box
        paddingY="2rem"
        maxWidth="lg"
        display="flex"
        alignItems="center"
        margin="0 auto"
      >
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
            <Box marginX="2rem">
              <Grid
                container
                spacing={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </Grid>
            </Box>
          </>
        ) : (
          <Box marginX="2rem">
            <Grid
              container
              spacing={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {products.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductsPage;
