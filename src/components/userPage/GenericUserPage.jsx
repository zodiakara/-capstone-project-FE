import {
  Avatar,
  Typography,
  Stack,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import MyNavbar from "../MyNavbar";
import PlaceIcon from "@mui/icons-material/Place";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const GenericUserPage = () => {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState({});
  const [fetchedProducts, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(true);
  const [displayReviews, setDisplayReviews] = useState(false);

  const products = fetchedProducts.filter(
    (product) => product.adopted !== true
  );

  const getUserProducts = async () => {
    const config = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    try {
      const response = await fetch(
        `${BE_URL}/users/${userId}/products`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {}
  };

  const getUserReviews = async () => {
    const config = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    try {
      const response = await fetch(
        `${BE_URL}/users/${userId}/userComments`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {}
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${BE_URL}/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log("error fetching user", error);
    }
  };

  const handleReviews = () => {
    setDisplayReviews(true);
    setDisplayProducts(false);
  };

  const handleProducts = () => {
    setDisplayProducts(true);
    setDisplayReviews(false);
  };
  useEffect(() => {
    getUser().then(() => {
      getUserProducts();
      getUserReviews();
    });
  }, []);

  return (
    <>
      <MyNavbar />
      <Container
        maxWidth
        disableGutters
        sx={{
          justifyContent: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            paddingY: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}
          >
            <Box>
              <Avatar
                imgProps={{
                  className: "userEditAvatar",
                }}
                sx={{
                  height: "200px",
                  width: "200px",
                  // border: "solid",
                  // borderColor: "#fbae42",
                }}
                src={user.avatar}
              />
            </Box>
            <Box>
              <Typography variant="h4">
                {user.name} {user.surname}
              </Typography>
              <Stack direction="row" color="text.secondary">
                {user.address ? (
                  <>
                    <PlaceIcon />
                    <Typography sx={{ marginTop: "0.25em" }}>
                      {" "}
                      {user.address.City}, {user.address.street}{" "}
                      {user.address.number}
                    </Typography>
                  </>
                ) : null}
              </Stack>
              <Stack>
                {user.bio ? (
                  <Typography variant="body1">{user.bio}</Typography>
                ) : null}
              </Stack>
            </Box>{" "}
          </Box>
          <Box sx={{ display: "flex" }}>
            {/* <Link to="/user_edit">
          <Tooltip title="edit user info" placement="bottom">
            <IconButton>
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>
        </Link> */}
          </Box>
        </Box>{" "}
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          gutterBottom
        >
          <Box
            className="userPageContainer"
            sx={{
              paddingX: "2rem",
              paddingTop: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-around",
                }}
              >
                <Typography
                  className="h6-options-list"
                  variant="h6"
                  disableGutters
                  onClick={handleProducts}
                >
                  Products
                </Typography>
                <Typography
                  className="h6-options-list"
                  variant="h6"
                  disableGutters
                  onClick={handleReviews}
                >
                  Reviews
                </Typography>
                <Typography
                  className="h6-options-list"
                  variant="h6"
                  disableGutters
                >
                  History
                </Typography>
              </Box>

              {/* <Link to="/product/add">
            <Button variant="outlined" className="btnStyle">
              add a new product
            </Button>
          </Link> */}
            </Box>
            <Grid
              container
              my={4}
              rowSpacing={4}
              columnSpacing={4}
              // sx={{
              //   display: "flex",
              //   justifyContent: "space-around",
              //   alignItems: "center",
              //   flexWrap: "wrap",
              // }}
            >
              {displayProducts &&
                products &&
                products.map((product) => (
                  <Grid item xs={4} key={product._id}>
                    <Card>
                      <Link to={`/products/${product._id}`}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.mainPicture}
                          alt="productImg"
                        />
                      </Link>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description.slice(0, 50).concat("...")}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              {displayReviews &&
                reviews &&
                reviews.map((review) => (
                  <Grid item xs={12} key={review._id}>
                    <Card>
                      <CardContent>
                        <Rating
                          value={review.content.rating}
                          precision={0.5}
                          onChange="disabled"
                          readOnly
                        />

                        <Typography variant="body1">
                          {review.content.text}
                        </Typography>
                        <Avatar />
                        <Typography variant="body2">
                          {/* {review.commenter} */}
                        </Typography>
                        <Typography variant="body2" fontSize="small">
                          {review.createdAt}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default GenericUserPage;
