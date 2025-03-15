"use client";
import { Product } from "./interface/product_interface";
import { useEffect, useState } from "react";
import clsxm from "./utils/clsxm";
import ProductCard from "./components/cards/ProductCard";
import CardSkeleton from "./components/cards/CardSkeleton";
import { getAllProduct } from "./services/product_services";

export default function Home() {
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProduct = async () => {
    const productData: Product[] = await getAllProduct();
    if (productData) {
      setProductList(productData);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="w-full h-screen p-8 flex flex-col gap-4">
      <h1 className="text-center text-[36px]">SHOP COLLECTION</h1>
      <div
        className={clsxm(
          "w-full h-screen grid gap-4",
          "desktop:grid-cols-4",
          "tablet grid-cols-2",
          "mobile:grid-cols-1"
        )}
      >
        {productList?.length > 0
          ? productList?.map((item) => (
              <div className="" key={item.productCode}>
                <ProductCard product={item} />
              </div>
            ))
          : Array.from({ length: 12 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
      </div>
    </div>
  );
}
