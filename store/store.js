import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/slices/cartSlice";
import authReducer from "@/store/slices/authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
