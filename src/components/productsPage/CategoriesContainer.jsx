import React, { useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import bulb from "../../assets/EcoBulb.png";
import house from "../../assets/EcoHouse.png";
import shirt from "../../assets/Tshirt.jpg";
import plant from "../../assets/sprout.jpg";
import dog from "../../assets/dog.png";
import teddy from "../../assets/teddy.png";

const MyComponent = ({ onItemClick }) => {
  const categories = [
    { name: "Clothing", image: shirt, color: "#9bd19d" },
    { name: "Toys", image: teddy, color: "#9e004d" },
    { name: "Household", image: house, color: "#fbae42" },
    { name: "Garden", image: plant, color: "#5f9f06" },
    { name: "Pets", image: dog, color: "#fc665b" },
    { name: "Other", image: bulb, color: "#afafaf" },
  ];
  const handleClick = (category) => {
    onItemClick(category);
  };

  return (
    <Box sx={{ bgcolor: "#f0f0f0" }}>
      <Box sx={{ bgcolor: "#fff", margin: "0 auto", paddingY: "0.5rem" }}>
        <Grid container justifyContent="center">
          {categories.map((category) => (
            <Grid
              item
              xs={12}
              md={4}
              lg={2}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                key={category.name}
                onClick={() => handleClick(category.name)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: { md: "1rem", sm: "none" },
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    opacity: "60%",
                    "&:hover": {
                      opacity: "100%",
                      border: "black",
                      textDecoration: "bold",
                    },
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{ height: "60px", width: "auto" }}
                    src={category.image}
                    alt={category.name}
                  />
                </Box>

                <Typography variant="h6">{category.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MyComponent;
