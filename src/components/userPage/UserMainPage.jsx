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
import CheckIcon from "@mui/icons-material/Check";
import ReviewModalAdopted from "./ReviewModalAdopted";
import ReviewModalDonated from "./ReviewModalDonated";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const UserMainPage = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [fetchedProducts, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(true);
  const [displayReviews, setDisplayReviews] = useState(false);
  const [displayHistory, setDisplayHistory] = useState(false);

  const [modalDonated, setModalDonated] = useState(false);
  const [modalAdopted, setModalAdopted] = useState(false);

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
  history.adopted = allProducts.filter(
    (product) => product.getter === currentUser._id
  );

  console.log(history.adopted);
  console.log(reviews);

  const getAllProducts = async () => {
    const response = await fetch(`${BE_URL}/products`);
    if (response.ok) {
      const data = await response.json();
      setAllProducts(data);
    }
  };

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

  const openModalDonated = () => {
    setModalDonated(true);
  };
  const openModalAdopted = () => {
    setModalAdopted(true);
  };
  const handleCloseDonated = () => {
    setModalDonated(false);
  };
  const handleCloseAdopted = () => {
    setModalAdopted(false);
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
    getAllProducts();
    getUserProducts();
    getUserReviews();
  }, [modalAdopted, modalDonated]);

  useEffect(() => {});

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

              <Link to="/product/add">
                <Button variant="outlined" className="btnStyle">
                  add a new product
                </Button>
              </Link>
            </Box>
            <Grid
              container
              xs={12}
              my={2}
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "stretch",
              }}
            >
              {displayProducts &&
                products &&
                products.map((product) => (
                  <Grid item xs={12} md={4} key={product._id}>
                    <Card>
                      <Link to={`/products/${product._id}`}>
                        <CardMedia
                          component="img"
                          height="160"
                          image={product.mainPicture}
                          alt="productImg"
                        />
                      </Link>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description.slice(0, 60).concat("...")}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              {displayReviews &&
                reviews &&
                reviews.map((review) => (
                  <Grid flexGrow={1} item xs={12} key={review._id}>
                    <Card>
                      <CardContent>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Link to={`/users/${review.commenter._id}`}>
                              {" "}
                              <Avatar
                                sx={{ margin: "0.25rem" }}
                                src={
                                  review.commenter
                                    ? review.commenter.avatar
                                    : ""
                                }
                              />
                            </Link>
                            <Typography
                              variant="h6"
                              sx={{ alignSelf: "center" }}
                            >
                              {review.commenter ? review.commenter.name : null}{" "}
                              {review.commenter
                                ? review.commenter.surname
                                : null}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            fontSize="small"
                            sx={{
                              fontStyle: "italic",
                            }}
                          >
                            {new Date(review.createdAt).toUTCString()}
                          </Typography>
                        </Stack>
                        <Rating
                          value={review.content.rating}
                          precision={0.5}
                          onChange="disabled"
                          readOnly
                        />

                        <Typography variant="body1">
                          {review.content.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              {displayHistory && (
                <Grid flexGrow={1} item xs={12}>
                  <List xs={12} flexGrow={1}>
                    {history.donated.map((product) => (
                      <ListItem
                        key={product._id}
                        className="productHistoryList"
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <Box sx={{ display: "flex" }}>
                          <Link to={`/products/${product._id}`}>
                            <Avatar
                              sx={{
                                height: "auto",
                                width: "50px",
                                paddingY: "0.5rem",
                              }}
                              variant="square"
                              src={product.mainPicture}
                              alt="productImg"
                            />
                          </Link>
                          <Stack sx={{ paddingX: "0.5rem" }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {product.description}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h6">Review:</Typography>
                          {product.reviews.userDonating ? (
                            <IconButton disableRipple color="success">
                              <CheckIcon />
                            </IconButton>
                          ) : (
                            <>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={openModalDonated}
                              >
                                add
                              </Button>
                              <ReviewModalDonated
                                sx={{
                                  "& .MuiBackdrop-root": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                                modal={modalDonated}
                                handleClose={handleCloseDonated}
                                product={product}
                              />
                            </>
                          )}
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <List xs={12} flexGrow={1}>
                    {history.adopted.map((product) => (
                      <ListItem
                        key={product._id}
                        className="productHistoryList"
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Link to={`/products/${product._id}`}>
                            <Avatar
                              sx={{
                                height: "auto",
                                width: "50px",
                                paddingY: "0.5rem",
                              }}
                              variant="square"
                              src={product.mainPicture}
                              alt="productImg"
                            />
                          </Link>
                          <Stack sx={{ paddingX: "0.5rem" }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {product.description}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h6">Review:</Typography>
                          {product.reviews.userAdopting ? (
                            <IconButton disableRipple color="success">
                              <CheckIcon />
                            </IconButton>
                          ) : (
                            <>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={openModalAdopted}
                              >
                                add
                              </Button>
                              <ReviewModalAdopted
                                modal={modalAdopted}
                                handleClose={handleCloseAdopted}
                                product={product}
                              />
                            </>
                          )}
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default UserMainPage;
