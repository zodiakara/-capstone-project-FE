import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsMainPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
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
      <ProductCard />
    </>
  );
};

export default ProductsMainPage;
