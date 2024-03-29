import { createAsyncThunk } from "@reduxjs/toolkit";
const BE_URL = process.env.REACT_APP_BE_DEV_URL;

export const sendProductImage = createAsyncThunk(
  "product/uploadMainImage",
  async ({ productId, image }) => {
    console.log("action image", image);
    console.log("action id", productId);
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
        const data = await response.json();
        console.log(data);
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

export const adoptProductAction = createAsyncThunk(
  "product/adoptProduct",
  async ({ productId, userId }) => {
    try {
      const config = {
        method: "PUT",
        body: JSON.stringify({ adopted: true, getter: userId }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/products/${productId}`, config);
      if (response.ok) {
        console.log("product succesfully adopted");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendProductReviewAction = createAsyncThunk(
  "product/sendReview",
  async (body) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/reviews`, config);
      if (response.ok) {
        console.log("review successfully sent!");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addReviewAction = createAsyncThunk(
  "product/adoptProduct",
  async ({ body, productId }) => {
    try {
      const config = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`${BE_URL}/products/${productId}`, config);
      if (response.ok) {
        console.log("review succesfully added to product");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
