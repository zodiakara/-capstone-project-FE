import { Image } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [product, setProduct] = useState({});
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch(`${BE_URL}/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.log("error fetching data ... ", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Box>
        <img
          alt="product"
          src={
            product.image
              ? product.mainImage
              : "http://source.unsplash.com/random"
          }
        />
        <Stack>
          {product.images
            ? product.images.map((image) => <Image src={image} />)
            : null}
        </Stack>
      </Box>
      <Box>
        <Typography variant="body1">{product.category}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2">{product.name}</Typography>
          <Button>add to watch list</Button>
        </Box>
        <Typography variant="body2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis magnam
          excepturi accusantium, nisi velit obcaecati eligendi officia
          voluptatum odit id aperiam inventore ullam unde tempora ducimus. Saepe
          corrupti sed voluptates.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button>ask about product</Button>
          <Button>adopt it</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
