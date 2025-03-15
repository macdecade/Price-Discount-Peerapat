"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function CartSummary() {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const finalAmount = useSelector((state: RootState) => state.cart.finalAmount);
  const appliedDiscounts = useSelector(
    (state: RootState) => state.cart.appliedDiscounts
  );

  return (
    <div className="p-4  rounded-lg shadow-md w-full max-w-md mx-auto bg-white">
      <h2 className="text-lg font-semibold">📋 รายการสรุป</h2>

      <div className="mt-4">
        <p className="text-sm">
          ราคา: <span className="float-right">{totalAmount} บาท</span>
        </p>
        <p className="text-sm text-blue-500">ยอดครบทุกๆ 500 บาท ลด 50 บาท</p>
      </div>

      {/* ✅ แสดงส่วนลดที่ถูกใช้ */}
      {appliedDiscounts.length > 0 ? (
        <div className="mt-2">
          <p className="text-sm text-red-500">
            ส่วนลดรวม:{" "}
            <span className="float-right">
              -{totalAmount - finalAmount} บาท
            </span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-400">ยังไม่มีส่วนลด</p>
      )}

      <hr className="my-2" />

      <div className="text-lg font-semibold">
        <p>
          รวม: <span className="float-right">{finalAmount} บาท</span>
        </p>
      </div>
    </div>
  );
}
