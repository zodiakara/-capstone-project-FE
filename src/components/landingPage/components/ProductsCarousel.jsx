import React, { useMemo } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Card,
  CardContent,
  CardMedia,
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

const productNameStyles = {
  position: "absolute",
  boxSizing: "border-box",
  maxHeight: 80,
  bottom: 0,
  width: "100%",
  backgroundColor: "#fff",
  zIndex: 4,
  padding: "1rem",
  "&:last-child": {
    paddingBottom: "1rem",
  },
  "& > p": {
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
};

export default function ProductsCarousel(props) {
  const { products } = props;
  // Detect the MD breakpoint from MUI
  const isNotMobileScreen = useMediaQuery("(min-width:900px)");

  const productChunks = useMemo(
    () =>
      chunkArray(
        products.reverse().slice(0, 12),
        // We want to show only a single item within carousel on
        // mobile screens
        !isNotMobileScreen ? 1 : 4
      ),
    [isNotMobileScreen, products]
  );

  return (
    <Carousel>
      {productChunks.map((chunk, i) => (
        <Grid
          container
          key={i}
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {chunk.map((product) => (
            <Grid key={product._id} item xs={12} md={3}>
              <Link to={`/products/${product._id}`}>
                <Card sx={{ position: "relative", height: 350 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.mainPicture}
                    alt={product.name}
                    subheader={product.category}
                    sx={{
                      filter: "blur(1.5rem)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.mainPicture}
                    alt={product.name}
                    subheader={product.category}
                    sx={{
                      objectFit: "contain",
                      position: "sticky",
                      zIndex: 2,
                    }}
                  />
                  <CategoryChip category={product.category} />
                  <CardContent sx={productNameStyles}>
                    <Typography variant="body1">{product.name}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
}
