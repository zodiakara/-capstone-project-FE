import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, InputAdornment, ListItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const BE_URL = process.env.REACT_APP_BE_DEV_URL;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  console.log(query);
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const searchProducts = async () => {
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(
        `${BE_URL}/products/search/?name=/${query}/i&adopted=false`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.log("error fetching data ... ", error);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [query]);

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
      <TextField
        className="searchInput"
        placeholder="Search for items ..."
        type="search"
        variant="outlined"
        fullWidth
        value={query}
        onFocus={() => {
          setOpen(true);
        }}
        onBlur={() => {
          // Quick workaround to delay the blur so that it fires after click event.
          setTimeout((e) => {
            setOpen(false);
            setQuery("");
          }, 100);
        }}
        onChange={handleQuery}
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
      {open ? (
        <Box fullWidth className="searchField">
          {query &&
            products.slice(0, 10).map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <ListItem>{product.name}</ListItem>
              </Link>
            ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchBar;
