"use client";
import * as React from "react";

import NavigationButton from "./NavigationButton";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
interface NavberProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavberProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="fixed top-0 w-full bg-base-dark z-50 shadow-lg">
        <div className="px-6 flex justify-between h-[80px] items-center">
          <div className="flex flex-row justify-center items-center">
            <div
              onClick={() => {}}
              className="transition hover:shadow-md cursor-pointer"
            >
              <h1 className="text-white text-[24px]">Shirt Shop</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full bg-[#bdbdbd] flex justify-center items-center">
              <span className="text-black font-semibold text-lg">
                <ShoppingCartIcon color="inherit" className="hover:scale-115" />
              </span>
              <span className="absolute -top-1 -right-1 flex justify-center items-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-[80px] w-full z-30 bg-[#F2F4F7]">
        <NavigationButton />
      </div>

      <main className="flex-grow mt-[133px]"> {children}</main>
    </>
  );
};

export default Navbar;
