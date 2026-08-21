import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddressFormValues } from "@/lib/validations/checkout";

export type SavedAddress = AddressFormValues & {
  id: string;
  title: string;
  isDefault: boolean;
};

const MOCK_ADDRESSES: SavedAddress[] = [
  {
    id: "home",
    title: "خانه",
    fullName: "کاربر هیوا",
    phone: "09102930575",
    province: "تهران",
    city: "تهران",
    address: "خیابان ولیعصر، کوچه بهار، پلاک ۲۴",
    postalCode: "1111111111",
    isDefault: true,
  },
  {
    id: "work",
    title: "محل کار",
    fullName: "کاربر هیوا",
    phone: "09102930575",
    province: "تهران",
    city: "تهران",
    address: "خیابان مطهری، ساختمان هیوا",
    postalCode: "2222222222",
    isDefault: false,
  },
];

interface AddressStore {
  addresses: SavedAddress[];
  add: (address: Omit<SavedAddress, "id" | "isDefault">) => void;
  update: (id: string, address: Omit<SavedAddress, "id" | "isDefault">) => void;
  remove: (id: string) => void;
  setDefault: (id: string) => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: MOCK_ADDRESSES,
      add: (address) =>
        set((s) => ({
          addresses: [
            ...s.addresses,
            {
              ...address,
              id: `address-${Date.now()}`,
              isDefault: s.addresses.length === 0,
            },
          ],
        })),
      update: (id, address) =>
        set((s) => ({
          addresses: s.addresses.map((item) =>
            item.id === id ? { ...item, ...address } : item
          ),
        })),
      remove: (id) =>
        set((s) => {
          const next = s.addresses.filter((item) => item.id !== id);
          if (next.length && !next.some((item) => item.isDefault))
            next[0].isDefault = true;
          return { addresses: next };
        }),
      setDefault: (id) =>
        set((s) => ({
          addresses: s.addresses.map((item) => ({
            ...item,
            isDefault: item.id === id,
          })),
        })),
    }),
    { name: "hiva-addresses" }
  )
);
