"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import clsxm from "../utils/clsxm";
import PromotionSelector from "./components/PromotionSelector";
import CartSummary from "./components/CartSummary";
import CartItemCollapse from "./components/CartItemCollapse";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="w-full h-screen p-8 flex flex-col gap-4">
      <h1 className="text-center text-[36px]">🛒 ตะกร้าสินค้า</h1>
      <div className="flex flex-row justify-between gap-4">
        <div className="w-3/4">
          {cartItems.length === 0 ? (
            <p className="text-center text-xl text-gray-500">
              ยังไม่มีสินค้าในตะกร้า
            </p>
          ) : (
            <CartItemCollapse />
          )}
        </div>
        <div className="w-1/4 flex flex-col gap-4">
          <PromotionSelector />
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
