import React from "react";

import { Breadcrumbs as MUIBreadcrumbs, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Breadcrumbs(props) {
  const { selectedCategory } = props;

  return (
    <Box backgroundColor="#fff">
      <Box maxWidth="lg" margin="0 auto">
        <Box padding="2rem">
          <MUIBreadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/">
              <Typography className="breadcrumbLink">Home</Typography>
            </Link>
            <Link color="inherit" to="/products">
              <Typography className="breadcrumbLink">Products</Typography>
            </Link>
            {selectedCategory ? (
              <Link color="inherit" to={`/products/${selectedCategory}`}>
                <Typography className="breadcrumbLink">
                  {selectedCategory}
                </Typography>
              </Link>
            ) : null}
          </MUIBreadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
