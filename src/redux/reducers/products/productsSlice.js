import { createSlice } from "@reduxjs/toolkit";
import { sendProductImage, sendProductImagesADD } from "./productSliceActions";

const initialState = {
  productImages: [],
  productImage: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductImage: (state, action) => {
      state.productImage = action.payload;
    },
    removeProductImage: (state) => {
      state.productImage = null;
    },
    addAdditionalImages: (state, action) => {
      state.productImages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendProductImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendProductImagesADD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendProductImagesADD.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
