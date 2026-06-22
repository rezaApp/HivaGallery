import type { AddressDto, DeliveryDto } from "./checkout";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItemDto {
  id: string;
  productId: string;
  name: string;
  description: string;
  priceUsd: number;
  quantity: number;
  subtotalUsd: number;
}

export interface OrderDto {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItemDto[];
  address: AddressDto;
  delivery: DeliveryDto;
  subtotalUsd: number;
  shippingFeeUsd: number;
  totalUsd: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequestDto {
  items: Array<{ productId: string; quantity: number }>;
  address: AddressDto;
  delivery: DeliveryDto;
}

export interface OrderListResponseDto {
  orders: OrderDto[];
  total: number;
}
