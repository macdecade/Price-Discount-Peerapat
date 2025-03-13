"use client";

import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Divider } from "@mui/material";
import { CartItem, Product } from "@/app/interface/product_interface";
import clsxm from "@/app/utils/clsxm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { addToCart } from "@/app/store/slices/productSlice";

interface ProductCardProps {
  product: Product;
  addSelectedProduct: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, addSelectedProduct }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(1);

  const handleIncrease = () => {
    if (amount < 100) {
      setAmount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: amount,
      totalPrice: product.price * amount,
    };

    dispatch(addToCart(cartItem)); // ส่งเข้า Redux
  };

  return (
    <div className={clsxm("col-span-1 rounded-md shadow-lg p-4 h-full")}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4">
              <AccountBoxIcon sx={{ fontSize: 50 }} />
              <div className="flex flex-col">
                <p className="font-semibold text-[16px] whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[200px] ">
                  {product.productNameLocal}
                </p>
                <p className="text-[14px] text-disabledText">
                  {product.productCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex flex-row justify-between items-center">
          <p className="w-1/2 text-disabledText">หมวดหมู่สินค้า</p>
          <p className="w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden text-right ">
            {product.productGroupNameLocal}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center">
          <p className="w-1/2 text-disabledText">ราคา</p>
          <p className="w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden text-right ">
            {product.price} ฿
          </p>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <RemoveCircleIcon
            onClick={handleDecrease}
            className="cursor-pointer "
          />
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (newValue >= 1 && newValue <= 100) {
                setAmount(newValue);
              }
            }}
            className="w-16 px-2 border-2 border-gray-400 rounded-lg text-[16px] text-center"
          />

          <AddCircleIcon onClick={handleIncrease} className="cursor-pointer " />
        </div>

        <button
          onClick={() => addSelectedProduct(product, amount)}
          className="mt-4 bg-secondary text-white px-4 py-2 rounded-md w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
