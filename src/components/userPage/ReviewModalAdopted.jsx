import { Button, Modal, Rating, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReviewAction,
  sendProductReviewAction,
} from "../../redux/reducers/products/productSliceActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",

  boxShadow: 10,
  p: 4,
  textAlign: "center",
};

const ProductModal = ({ modal, handleClose, product }) => {
  const [review, setReview] = useState(null);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);

  const cleanUp = () => {
    setContent("");
    setReview(null);
  };
  const handleReview = () => {
    const reviewData = {
      commenter: currentUser._id,
      receiver: product.owner,
      content: { text: content, rating: review },
    };
    const reviewToAdd = {
      reviews: {
        userAdopting: true,
      },
    };
    console.log(reviewData);
    console.log(product);
    dispatch(sendProductReviewAction(reviewData));
    dispatch(
      addReviewAction({ body: reviewToAdd, productId: product._id })
    ).then(() => {
      handleClose();
    });
    cleanUp();
  };

  return (
    <>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How would You rate this swap?
          </Typography>
          <Rating
            required
            name="simple-controlled"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <Typography id="modal-modal-title" variant="body2" component="h2">
            Please tell us how it went:
          </Typography>
          <TextField
            sx={{ display: "flex", flexGrow: "1", color: "[#ffc107]" }}
            required
            multiline
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
          <Box
            sx={{ display: "flex", mt: 2, justifyContent: "center" }}
            id="modal-modal-description"
          >
            <Button onClick={handleReview}>Save</Button>
            <Button onClick={handleClose}>Discard</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductModal;
