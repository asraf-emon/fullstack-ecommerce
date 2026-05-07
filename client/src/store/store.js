import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popupSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import wishlistReducer from "./slices/wishlistSlice";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) {
      return { cart: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Could not load cart state from localStorage:", err);
    return { cart: [] };
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    cart: cartReducer,
    product: productReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
  },

  preloadedState: {
    cart: loadCartState(),
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const cartState = state.cart;
    localStorage.setItem("cartItems", JSON.stringify(cartState));
  } catch (err) {
    console.error("Could not save cart state", err);
  }
});

export default store;
