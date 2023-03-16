import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsMainPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [products, setProducts] = useState([]);
  const categories = [
    { name: "Clothing", image: "" },
    { name: "Kids Clothing", image: "" },
    { name: "Toys", image: "" },
    { name: "Household", image: "" },
    { name: "Electronics", image: "" },
    { name: "Garden", image: "" },
    { name: "Pets", image: "" },
    { name: "Other", image: "" },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            want to contribute <br></br>to our community?
          </Typography>
          <Box>
            {userInfo ? (
              <Link to="/product/add">
                <Button>ADD PRODUCT</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button>REGISTER</Button>
              </Link>
            )}
          </Box>
        </Box>
        <Box>aaaaaa</Box>
      </Box>
      <Typography variant="h4">Categories</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.name}
            sx={{
              opacity: "60%",
              padding: "1rem",
              cursor: "pointer",
              width: "8%",
              textAlign: "center",

              "&:hover": {
                opacity: "100%",
                border: "black",
                textDecoration: "bold",
              },
            }}
          >
            <CardContent>
              <Typography>{category.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Typography variant="h4">Recently added</Typography>
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </>
  );
};

export default ProductsMainPage;
