"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { updateQuantity, removeFromCart } from "@/app/store/slices/cartSlice";
import { CartItem } from "@/app/interface/product_interface";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Divider } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import clsxm from "@/app/utils/clsxm";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(item.quantity);

  const handleIncrease = () => {
    if (amount < 100) {
      const newQuantity = amount + 1;
      setAmount(newQuantity);
      dispatch(
        updateQuantity({ productCode: item.productCode, quantity: newQuantity })
      );
    }
  };

  const handleDecrease = () => {
    if (amount > 1) {
      const newQuantity = amount - 1;
      setAmount(newQuantity);
      dispatch(
        updateQuantity({ productCode: item.productCode, quantity: newQuantity })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= 1 && newValue <= 100) {
      setAmount(newValue);
      dispatch(
        updateQuantity({ productCode: item.productCode, quantity: newValue })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.productCode));
  };

  return (
    <div className="grid grid-cols-6 items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      {/* ✅ Product Image */}
      <div className="col-span-1 flex justify-center">
        <AccountBoxIcon sx={{ fontSize: 60 }} />
      </div>

      {/* ✅ Product Details */}
      <div className="col-span-2 flex flex-col gap-1">
        <p className="font-semibold text-lg">{item.productNameLocal}</p>
        <p className="text-sm text-gray-500">{item.productCode}</p>
        <p className="font-semibold text-lg">{item.price} ฿</p>
      </div>

      {/* ✅ Price */}
      <div className="col-span-1 text-center">
        <p className="font-semibold text-lg text-secondary">{item.price * amount} ฿</p>
      </div>

      {/* ✅ Quantity Controls */}
      <div className="col-span-1 flex justify-center items-center gap-2">
        <RemoveCircleIcon
          onClick={handleDecrease}
          className="cursor-pointer text-gray-600 hover:text-red-500"
        />
        <input
          type="text"
          value={amount}
          onChange={handleChange}
          className="w-12 border border-gray-400 text-center rounded-md"
        />
        <AddCircleIcon
          onClick={handleIncrease}
          className="cursor-pointer text-gray-600 hover:text-green-500"
        />
      </div>

      {/* ✅ Delete Button */}
      <div className="col-span-1 flex justify-center">
        <DeleteIcon
          onClick={handleRemove}
          className="cursor-pointer text-red-500 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default CartItemCard;
