import type { Coords } from "./common";

export interface AddressDto {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode?: string;
  coordinates?: Coords;
}

export type DeliveryDate = "today" | "tomorrow" | "dayAfterTomorrow";

export type TimeSlot = "morning" | "afternoon" | "evening";

export interface DeliveryDto {
  date: DeliveryDate;
  timeSlot: TimeSlot;
}
