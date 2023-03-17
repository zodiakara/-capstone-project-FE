import { createAsyncThunk } from "@reduxjs/toolkit";
const BE_URL = process.env.REACT_APP_BE_DEV_URL;

export const sendProductImage = createAsyncThunk(
  "product/uploadMainImage",
  async ({ productId, image }) => {
    const form = new FormData();
    form.append("mainPicture", image);
    try {
      const config = {
        method: "POST",
        body: form,
      };
      const response = await fetch(
        `${BE_URL}/products/${productId}/files`,
        config
      );
      if (response.ok) {
        console.log("picture added");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendProductImagesADD = createAsyncThunk(
  "product/uploadAdditionalImages",
  async ({ productId, images }) => {
    const form = new FormData();
    form.append("additionalPictures", images);
    try {
      const config = {
        method: "POST",
        body: form,
      };
      const response = await fetch(
        `${BE_URL}/products/${productId}/filesAdditional`,
        config
      );
      if (response.ok) {
        console.log("additional pictures added");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
