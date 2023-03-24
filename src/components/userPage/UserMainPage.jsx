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
  List,
  ListItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyNavbar from "../MyNavbar";
import PlaceIcon from "@mui/icons-material/Place";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Footer from "../Footer";
import ReviewModal from "./ReviewModal";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const UserMainPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [fetchedProducts, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(true);
  const [displayReviews, setDisplayReviews] = useState(false);
  const [displayHistory, setDisplayHistory] = useState(false);

  const [modal, setModal] = useState(false);

  const products = fetchedProducts.filter(
    (product) => product.adopted !== true
  );

  const history = {
    adopted: [],
    donated: [],
  };
  history.donated = fetchedProducts.filter(
    (product) => product.adopted === true
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
        `${BE_URL}/users/${currentUser._id}/products`,
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
        `${BE_URL}/users/${currentUser._id}/userComments`,
        config
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {}
  };

  const openModal = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleReviews = () => {
    setDisplayReviews(true);
    setDisplayProducts(false);
    setDisplayHistory(false);
  };

  const handleProducts = () => {
    setDisplayProducts(true);
    setDisplayReviews(false);
    setDisplayHistory(false);
  };
  const handleHistory = () => {
    setDisplayHistory(true);
    setDisplayProducts(false);
    setDisplayReviews(false);
  };
  useEffect(() => {
    getUserProducts();
    getUserReviews();
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
                src={currentUser.avatar}
              />
            </Box>
            <Box>
              <Typography variant="h4">
                {currentUser.name} {currentUser.surname}
              </Typography>
              <Stack direction="row" color="text.secondary">
                <PlaceIcon />
                <Typography sx={{ marginTop: "0.25em" }}>
                  {" "}
                  {currentUser.address.City}, {currentUser.address.street}{" "}
                  {currentUser.address.number}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="body1">{currentUser.bio}</Typography>
              </Stack>
            </Box>{" "}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Link to="/user_edit">
              <Tooltip title="edit user info" placement="bottom">
                <IconButton>
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>
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
              className="userPageContainerTab"
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
                  onClick={handleHistory}
                >
                  History
                </Typography>
              </Box>
              <ReviewModal modal={modal} handleClose={handleClose} />
              <Link to="/product/add">
                <Button variant="outlined" className="btnStyle">
                  add a new product
                </Button>
              </Link>
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
              {displayHistory && (
                <List xs={12} flexGrow={1}>
                  {history.donated.map((product) => (
                    <ListItem
                      key={product._id}
                      className="productHistoryList"
                      sx={{ display: "flex", alignItems: "flex-start" }}
                    >
                      <Link to={`/products/${product._id}`}>
                        <Avatar
                          sx={{
                            height: "50px",
                            width: "auto",
                            paddingY: "0.5rem",
                          }}
                          variant="square"
                          src={product.mainPicture}
                          alt="productImg"
                        />
                      </Link>
                      <Stack sx={{ paddingX: "0.5rem" }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">Review:</Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={openModal}
                        >
                          add
                        </Button>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          </Box>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default UserMainPage;
