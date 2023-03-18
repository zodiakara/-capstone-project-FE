import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const ProductCard = (product) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={3}
      sx={{ display: "flex", justifyContent: "space-evenly", flexGrow: "1" }}
    >
      <Card sx={{ width: "350px", margin: "1em" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
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
            {product.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
