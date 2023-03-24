import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";

const InfoPage = () => {
  return (
    <>
      <MyNavbar />
      {/* <Box>
        <Typography variant="h3"> </Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          The main goal of swAPP is to promote sustainability and reduce waste
          by encouraging and teaching people a circular economy approach.
        </Typography>{" "}
        <Typography variant="h5">do i really need another dress?</Typography>
        <Typography variant="h5">
          fancy set of cutlery I've never used?
        </Typography>
        <Typography variant="h5">
          are 3 cars in a family of 4 absolutely necessary?{" "}
        </Typography>
      </Box> */}
      <Container
        maxWidth
        sx={{
          minHeight: "100vh",
          display: "flex",

          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <div sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://picsum.photos/600/400"
                  alt="Random"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <h1
                  sx={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                  }}
                >
                  why swapp?
                </h1>
                <Typography variant="body2">
                  The main goal of swAPP is to promote sustainability and reduce
                  waste by encouraging and teaching people a circular economy
                  approach.
                </Typography>{" "}
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            // padding: theme.spacing(4),
            // backgroundColor: theme.palette.common.white,
            // borderRadius: theme.shape.borderRadius,
            // boxShadow: theme.shadows[2],
            // marginBottom: theme.spacing(4),
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <div sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://picsum.photos/400/600"
                  alt="Random"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3> are 3 cars in a family of 4 absolutely necessary?</h3>
              <h3>do i really need another dress?</h3>
            </Grid>
            <Grid item xs={12} sm={6}>
              {" "}
              <p>
                We need to ask ourselves: are we really controlling what we own.
                or are our belongings controlling us ?
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                By a simple swap users can give their unwanted items a second
                life, cut the need for new products and reducing the amount of
                waste generated.
              </Typography>{" "}
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            // padding: theme.spacing(4),
            // backgroundColor: theme.palette.common.white,
            // borderRadius: theme.shape.borderRadius,
            // boxShadow: theme.shadows[2],
            // marginBottom: theme.spacing(4),
            maxWidth: 800,
            width: "100%",
          }}
        ></Box>
      </Container>
      <Container
        maxWidth
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "success",
        }}
      >
        {/* <Typography variant="h2" gutterBottom>
          We need to ask ourselves:
        </Typography>
        <p>
        We need to ask ourselves: are we really controlling what we own. or are our belongings
          controlling us ?
        </p> */}
      </Container>
      <Container
        maxWidth
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        ></Box>
        <Box
          sx={{
            // padding: theme.spacing(4),
            // backgroundColor: theme.palette.common.white,
            // borderRadius: theme.shape.borderRadius,
            // boxShadow: theme.shadows[2],
            // marginBottom: theme.spacing(4),
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Grid container spacing={4}></Grid>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}></Box>
      </Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "5em" }}
      ></Box>
      <Container
        container
        fullWidth
        sx={{ display: "flex", justifyContent: "center", marginBottom: "5em" }}
      >
        <Grid item xs={12} sm={12}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Look around and think if in Your household are some stacked
              unnecessary things ... if You find them, We are here for You!
            </Typography>
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default InfoPage;
