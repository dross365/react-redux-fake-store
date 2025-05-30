import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const uniqueId = {
        ...action.payload,
        itemId: uuidv4(),
      };
      state.push(uniqueId);
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.itemId !== action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
