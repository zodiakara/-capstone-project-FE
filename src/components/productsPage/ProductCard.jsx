import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

import { useSelector } from "react-redux";

const ProductCard = (product) => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const avatarLinkPath =
    currentUser._id === product.owner._id
      ? "/user"
      : `/users/${product.owner._id}`;

  return (
    <Grid
      item
      // xs={12}
      // md={4}
      // lg={3}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Card sx={{ width: "357px" }}>
        <CardHeader
          avatar={
            <Link to={avatarLinkPath}>
              <Avatar
                src={product.owner.avatar ? product.owner.avatar : null}
                sx={{ bgcolor: "success" }}
                aria-label="owner"
              />
            </Link>
          }
          title={product.name}
          subheader={product.category}
        />
        <Link to={`/products/${product._id}`}>
          <CardMedia
            component="img"
            height="194"
            image={product.mainPicture}
            alt="product"
          />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.description.slice(0, 40).concat("...")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
          <Link to={`/products/${product._id}`}>
            <IconButton aria-label="share">
              <ArrowForwardIosIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
