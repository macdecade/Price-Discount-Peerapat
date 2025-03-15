export interface Product {
  productCode: string;
  productNameLocal: string;
  productGroupCode: string;
  productGroupNameLocal: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}

export interface ShoppingCart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  appliedDiscounts: Discount[];
  finalAmount: number;
}

export interface Discount {
  type: "fixed" | "percentage" | "onTop" | "points" | "seasonal";
  amount?: number;
  percentage?: number;
  category?: string;
  every?: number;
  discountPerEvery?: number;
}

export interface DiscountItem {
  promotionCode: string;
  promotionGroupCode: string;
  promotionGroupCategory: string;
  promotionNameLocal: string;
  amount: number;
}

export type DiscountCategory = "Coupon" | "OnTop";
