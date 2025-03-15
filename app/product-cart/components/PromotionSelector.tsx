"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DiscountItem,
  DiscountCategory,
} from "@/app/interface/product_interface";
import { useAppSelector } from "@/app/hooks/useAppDispatch";
import DropdownCustom from "@/app/components/inputs/DropDownCustom";
import { getDiscountByType } from "@/app/services/discount_services";
import { applyCoupon, applyOnTopDiscount } from "@/app/store/slices/cartSlice";
import { Objects } from "@/app/interface/app_interface";

export default function PromotionSelector() {
  const dispatch = useDispatch();
  const totalProductItem = useAppSelector((state) => state.cart.totalItems);
  const selectedCoupon = useAppSelector((state) => state.cart.selectedCoupon);
  const selectedOnTop = useAppSelector((state) => state.cart.selectedOnTop);

  const [couponList, setCouponList] = useState<DiscountItem[]>([]);
  const [onTopList, setOnTopList] = useState<DiscountItem[]>([]);

  // ✅ โหลดโปรโมชั่นเมื่อ component render
  useEffect(() => {
    const fetchData = async () => {
      const coupons = await getDiscountByType("Coupon");
      const onTop = await getDiscountByType("OnTop");
      if (coupons) setCouponList(coupons);
      if (onTop) setOnTopList(onTop);
    };

    fetchData();
  }, []);

  const handleSelect = (category: DiscountCategory, value: any) => {
    if (category === "Coupon") {
      dispatch(applyCoupon(value ? value : {}));
    } else {
      dispatch(applyOnTopDiscount(value ? value : {}));
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md w-full max-w-md mx-auto bg-white flex flex-col gap-4">
      <h1>🛒 รายการทั้งหมด {totalProductItem} ชิ้น</h1>
      <h2 className="text-lg font-semibold">🎟 เลือกโปรโมชั่น</h2>

      {/* ✅ Dropdown สำหรับเลือก Coupon */}
      <DropdownCustom
        selected={selectedCoupon}
        items={couponList}
        setSelected={(value) => handleSelect("Coupon", value)}
        placeholder={"เลือกคูปอง"}
        objectKey={"promotionNameLocal"}
      />

      {/* ✅ Dropdown สำหรับเลือก OnTop */}
      <DropdownCustom
        selected={selectedOnTop}
        items={onTopList}
        setSelected={(value) => handleSelect("OnTop", value)}
        placeholder={"เลือก on top promotion"}
        objectKey={"promotionNameLocal"}
      />
    </div>
  );
}
