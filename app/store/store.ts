// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// For TypeScript users
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
