import prodouctdata from "@/data/masProduct.json";

export const getAllProduct = async () => {
  const productList = prodouctdata;
  return productList;
};
