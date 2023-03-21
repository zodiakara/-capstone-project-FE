import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MyNavbar from "./MyNavbar";

const InfoPage = () => {
  return (
    <>
      <MyNavbar />
      <Box>
        <Typography variant="h3">why swapp? </Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          The main goal of swAPP is to promote sustainability and reduce waste
          by encouraging and teaching people a circular economy approach.
        </Typography>{" "}
        <Typography variant="body2">
          By a simple swap users can give their unwanted items a second life,
          cut the need for new products and reducing the amount of waste
          generated.
        </Typography>{" "}
        <Typography variant="h5">do i really need another dress?</Typography>
        <Typography variant="h5">
          fancy set of cutlery I've never used?
        </Typography>
        <Typography variant="h5">
          are 3 cars in a family of 4 absolutely necessary?{" "}
        </Typography>
        <Typography>
          Look around and think if in Your household are some stacked
          unnecessary things ... if You find them, We are here for You!
        </Typography>
        <Typography variant="h5">but its more than that ...</Typography>
        <Typography>
          With swAPP we also want to promote community building and encourage
          users to engage with each other to share knowledge and experiences,
          creating a more sustainable and connected world.
        </Typography>
      </Box>
    </>
  );
};

export default InfoPage;
