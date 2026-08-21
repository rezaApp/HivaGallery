import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserDto } from "@/types";
import type { AuthMethod } from "@/types";

interface AuthFlowStore {
  credential: string;
  method: AuthMethod;
  setFlow: (credential: string, method: AuthMethod) => void;
  reset: () => void;
}

interface AuthStore {
  user: UserDto | null;
  setUser: (user: UserDto) => void;
  signOut: () => void;
}

export const useAuthFlowStore = create<AuthFlowStore>()((set) => ({
  credential: "",
  method: "mobile",
  setFlow: (credential, method) => set({ credential, method }),
  reset: () => set({ credential: "", method: "mobile" }),
}));

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: "hiva-auth" }
  )
);

export const MOCK_USER: UserDto = {
  id: "mock-user-1",
  name: "کاربر هیوا",
  mobile: "09102930575",
  role: "customer",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

export const MOCK_OTP = "123456";
