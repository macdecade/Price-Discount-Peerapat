import { Objects } from "@/app/interface/app_interface";
import {
  CartItem,
  Discount,
  ShoppingCart,
} from "@/app/interface/product_interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState extends ShoppingCart {
  selectedCoupon: Objects;
  selectedOnTop: Objects;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  appliedDiscounts: [],
  selectedCoupon: {}, // ✅ เก็บคูปองที่เลือก
  selectedOnTop: {},
  finalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productCode === action.payload.productCode
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
          totalPrice: action.payload.price * action.payload.quantity,
        });
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productCode !== action.payload
      );
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    // ✅ ตั้งค่า `selectedCoupon`
    applyCoupon: (state, action: PayloadAction<Objects>) => {
      state.selectedCoupon = action.payload;
    },

    // ✅ ตั้งค่า `selectedOnTop`
    applyOnTopDiscount: (state, action: PayloadAction<Objects>) => {
      state.selectedOnTop = action.payload;
    },

    removeDiscount: (state, action: PayloadAction<string>) => {
      if (state.selectedCoupon?.type === action.payload) {
        state.selectedCoupon = {};
      }
      if (state.selectedOnTop?.type === action.payload) {
        state.selectedOnTop = {};
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productCode: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productCode === action.payload.productCode
      );
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = item.quantity * item.price;
      }
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  applyCoupon,
  applyOnTopDiscount,
  removeDiscount,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
