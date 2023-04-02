import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import graphic from "../assets/undraw_Dreamer_re_9tua.png";
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";

const InfoPage = () => {
  return (
    <>
      <MyNavbar />
      <Grid container sx={{ padding: "2rem" }}>
        <Grid item xs={12}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
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
              Swapp is a mobile application that allows users to swap their
              products on six main categories, including toys, household items,
              garden supplies, pets, clothing, and other miscellaneous items.
              The main goal of swAPP is to promote sustainability and reduce
              waste <br></br>by encouraging and teaching people a circular
              economy approach. BUYING IS NOT THE ONLY WAY OF GETTING A GOOD
              QUALITY STUFF.
            </Typography>{" "}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "center",
            }}
          >
            <h4
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              swapp primary features:
            </h4>
            <Typography variant="body2">
              The app's primary features include the ability to add a product to
              the platform and browse through a gallery of products within the
              six main categories.
            </Typography>{" "}
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">
            The main reasons for creating Swapp are to provide users with an
            alternative to traditional methods of buying and selling products,
            promote sustainability by reducing waste, and encourage social
            interaction and community building among users.<br></br> By allowing
            users to exchange goods with others, Swapp helps to reduce the
            number of products that end up in landfills and gives individuals
            the opportunity to acquire new items without spending money.
          </Typography>{" "}
        </Grid>

        <Typography variant="h5">do i really need another dress?</Typography>
        <Typography variant="h5">
          fancy set of cutlery I've never used?
        </Typography>
        <Typography variant="h5">
          are 3 cars in a family of 4 absolutely necessary?{" "}
        </Typography>
        <Grid item xs={12}>
          <Typography variant="body2">
            In addition, Swapp provides a platform for users to connect with
            others who share similar interests and hobbies. The app's community
            features, such as the ability to add reviews to each swap and engage
            in conversations with other users, <br></br>create a sense of
            community and encourage social interaction.
          </Typography>{" "}
        </Grid>
        <Grid item xs={12}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "center",
            }}
          >
            <h4
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              Now, lets start swapping!!
            </h4>
          </div>
        </Grid>
      </Grid>

      <Container
        maxWidth
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img className="mainGraphic" alt="" src={graphic} />
      </Container>
    </>
  );
};

export default InfoPage;
