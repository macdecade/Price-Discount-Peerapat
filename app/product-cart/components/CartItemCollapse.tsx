"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CartItemCard from "@/app/components/cards/CartItemCard";

const CartItemCollapse = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // ✅ จัดกลุ่มสินค้าในตะกร้าตาม `productGroupNameLocal`
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.productGroupNameLocal]) {
      acc[item.productGroupNameLocal] = [];
    }
    acc[item.productGroupNameLocal].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  return (
    <div className="w-full">
      {Object.entries(groupedItems).map(([category, items]) => (
        <Accordion key={category} className="mb-2">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 className="text-lg font-semibold">{category}</h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItemCard key={item.productCode} item={item} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CartItemCollapse;
