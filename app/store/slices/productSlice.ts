import {
  Discount,
  Product,
  ShoppingCart,
} from "@/app/interface/product_interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ShoppingCart = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  appliedDiscounts: [],
  finalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.productCode === action.payload.productCode
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
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
      state.finalAmount = state.totalAmount;
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
      state.finalAmount = state.totalAmount;
    },

    applyDiscounts: (state, action: PayloadAction<Discount[]>) => {
      let discountedTotal = state.totalAmount;
      state.appliedDiscounts = action.payload;

      action.payload.forEach((discount) => {
        switch (discount.type) {
          case "fixed":
            discountedTotal -= discount.amount ?? 0;
            break;
          case "percentage":
            discountedTotal -=
              (discountedTotal * (discount.percentage ?? 0)) / 100;
            break;
          case "onTop":
            if (discount.category) {
              const categoryDiscount = state.items
                .filter((item) => item.productGroupCode === discount.category)
                .reduce(
                  (sum, item) =>
                    sum +
                    item.price *
                      item.quantity *
                      ((discount.percentage ?? 0) / 100),
                  0
                );
              discountedTotal -= categoryDiscount;
            }
            break;
          case "points":
            const maxDiscount = state.totalAmount * 0.2;
            discountedTotal -= Math.min(discount.amount ?? 0, maxDiscount);
            break;
          case "seasonal":
            if (discount.every && discount.discountPerEvery) {
              const seasonalDiscount =
                Math.floor(discountedTotal / discount.every) *
                discount.discountPerEvery;
              discountedTotal -= seasonalDiscount;
            }
            break;
        }
      });

      state.finalAmount = Math.max(0, discountedTotal);
    },

    removeDiscount: (state, action: PayloadAction<string>) => {
      state.appliedDiscounts = state.appliedDiscounts.filter(
        (discount) => discount.type !== action.payload
      );

      let discountedTotal = state.totalAmount;

      state.appliedDiscounts.forEach((discount) => {
        switch (discount.type) {
          case "fixed":
            discountedTotal -= discount.amount ?? 0;
            break;
          case "percentage":
            discountedTotal -=
              (discountedTotal * (discount.percentage ?? 0)) / 100;
            break;
          case "onTop":
            if (discount.category) {
              const categoryDiscount = state.items
                .filter((item) => item.productGroupCode === discount.category)
                .reduce(
                  (sum, item) =>
                    sum +
                    item.price *
                      item.quantity *
                      ((discount.percentage ?? 0) / 100),
                  0
                );
              discountedTotal -= categoryDiscount;
            }
            break;
          case "points":
            const maxDiscount = state.totalAmount * 0.2;
            discountedTotal -= Math.min(discount.amount ?? 0, maxDiscount);
            break;
          case "seasonal":
            if (discount.every && discount.discountPerEvery) {
              const seasonalDiscount =
                Math.floor(discountedTotal / discount.every) *
                discount.discountPerEvery;
              discountedTotal -= seasonalDiscount;
            }
            break;
        }
      });

      state.finalAmount = Math.max(0, discountedTotal);
    },
  },
});

export const { addToCart, removeFromCart, applyDiscounts, removeDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;
