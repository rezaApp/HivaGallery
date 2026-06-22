import type { PaginatedResponse } from "./common";

export type ProductCategory =
  | "electronics"
  | "sports"
  | "kitchen"
  | "accessories"
  | "homeOffice";

export type ProductSortKey =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  priceUsd: number;
  categoryKey: ProductCategory;
  subcategoryKey?: string;
  imageUrl?: string;
  stock: number;
  isActive: boolean;
}

export interface ProductDetailDto extends ProductDto {
  longDescription: string;
  specs: ProductSpec[];
  reviews: ProductReview[];
  relatedIds: string[];
}

export interface ProductCardDto {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
  categoryKey: ProductCategory;
  categoryLabel: string;
  subcategoryKey?: string;
}

export interface ProductListRequestDto {
  page?: number;
  pageSize?: number;
  category?: ProductCategory;
  sort?: ProductSortKey;
  search?: string;
}

export type ProductListResponseDto = PaginatedResponse<ProductDto>;
