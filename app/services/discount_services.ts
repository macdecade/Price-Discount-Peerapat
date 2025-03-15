import discountData from "@/data/masPromotionList.json";
import { DiscountCategory } from "../interface/product_interface";

export const getDiscountByType = async (category: DiscountCategory) => {
  try {
    const discountList = discountData;
    const filterDiscountList = discountList.filter(
      (item) => item.promotionGroupCategory === category
    );
    return filterDiscountList;
  } catch (error) {
    console.error("Error getDiscountByType: ", error);
  }
};
