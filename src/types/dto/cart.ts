export interface CartItemDto {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
  quantity: number;
}

export interface CartDto {
  items: CartItemDto[];
  totalItems: number;
  subtotalUsd: number;
}

export interface AddToCartRequestDto {
  productId: string;
  quantity?: number;
}

export interface UpdateCartItemRequestDto {
  quantity: number;
}
