import React from "react";

import { Chip } from "@mui/material";

export default function CategoryChip(props) {
  return (
    <Chip
      sx={{
        boxShadow: 3,
        position: "absolute",
        left: "16px",
        top: "16px",
        zIndex: 3,
        bgcolor: ["#5f9f06"],
        color: "#fff",
      }}
      label={props.category}
    />
  );
}
