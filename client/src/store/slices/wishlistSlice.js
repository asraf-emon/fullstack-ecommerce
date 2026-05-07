import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.wishlistItems.find(
        (item) => item._id === action.payload._id,
      );

      if (itemExists) {
        toast.error("Product already in wishlist");
      } else {
        state.wishlistItems.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
        toast.success("Added to wishlist!");
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload,
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      toast.success("Removed from wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
