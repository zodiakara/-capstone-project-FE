import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MyNavbar from "../MyNavbar";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import CategoriesContainer from "./CategoriesContainer";
import Breadcrumbs from "./Breadcrumbs";

import getProducts from "./api/getProducts";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);

  const products = allProducts.filter((product) => product.adopted !== true);

  useEffect(() => {
    getProducts(selectedCategory, setAllProducts);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
    getProducts(category, setAllProducts);
  };

  return (
    <>
      <MyNavbar />
      <Breadcrumbs selectedCategory={selectedCategory} />
      <CategoriesContainer onItemClick={handleCategoryClick} />
      <SearchBar />
      <Box
        paddingY="2rem"
        maxWidth="lg"
        display="flex"
        alignItems="center"
        margin="0 auto"
      >
        <Box marginX="2rem">
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProductsPage;
