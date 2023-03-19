import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

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

const ProductModal = ({ open, handleClose, handleAdoptProduct }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You sure You want to adopt this product?
          </Typography>
          <Box
            sx={{ display: "flex", mt: 2, justifyContent: "center" }}
            id="modal-modal-description"
          >
            <Button onClick={handleAdoptProduct}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductModal;
