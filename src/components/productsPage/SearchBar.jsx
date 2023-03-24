import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Breadcrumbs,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";

const SearchBar = ({ category }) => {
  return (
    <Box width="100%" sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href="/products">
            Products
          </Link>
          {category ? (
            <Link color="inherit" href="/products/">
              {category}
            </Link>
          ) : null}
        </Breadcrumbs>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <TextField
          placeholder="Search"
          type="search"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
