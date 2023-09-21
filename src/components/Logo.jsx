import { Box, Typography } from "@mui/material";
import { AllInclusive } from "@mui/icons-material";

function Logo() {
  return (
    <Box display="flex" alignItems="center" color="#000">
      <AllInclusive sx={{ display: { xs: "none", md: "flex" } }} />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mx: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          cursor: "pointer",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        s<span style={{ letterSpacing: ".3rem" }}>wapp</span>
      </Typography>
    </Box>
  );
}

export default Logo;
