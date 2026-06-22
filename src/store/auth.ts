import { create } from "zustand";
import type { AuthMethod } from "@/types";

interface AuthFlowStore {
  credential: string;
  method: AuthMethod;
  setFlow: (credential: string, method: AuthMethod) => void;
  reset: () => void;
}

export const useAuthFlowStore = create<AuthFlowStore>()((set) => ({
  credential: "",
  method: "mobile",
  setFlow: (credential, method) => set({ credential, method }),
  reset: () => set({ credential: "", method: "mobile" }),
}));
