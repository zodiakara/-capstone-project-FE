import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import CategoryChip from "./CategoryChip";

const chunkArray = (array, chunkSize) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);
  return [...Array(numberOfChunks)].map((value, index) => {
    return array.slice(index * chunkSize, (index + 1) * chunkSize);
  });
};

const cardContentStyles = {
  padding: "1rem",
  "&:last-child": {
    paddingBottom: "1rem",
  },
};

export default function ProductsCarousel(props) {
  const { products } = props;
  // Detect the MD breakpoint from MUI
  const isNotMobileScreen = useMediaQuery("(min-width:900px)");

  const productChunks = chunkArray(
    products.reverse().slice(0, 12),
    // We want to show only a single item within carousel on
    // mobile screens
    !isNotMobileScreen ? 1 : 4
  );

  return (
    <Carousel>
      {productChunks.map((chunk) => (
        <Grid
          container
          key={chunk.index}
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {chunk.map((product) => (
            <Grid key={product._id} item xs={12} md={3}>
              <Card sx={{ position: "relative" }}>
                <Link to={`/products/${product._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.mainPicture}
                    alt="product"
                    subheader={product.category}
                  />
                </Link>
                <CategoryChip category={product.category} />
                <CardContent sx={cardContentStyles}>
                  <Typography variant="body1">{product.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
}
