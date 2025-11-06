import { create } from "zustand";
import { UIState } from "../types";

export const useUIStore = create<UIState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (id: number | null) => set({ selectedCategory: id }),
  searchText: "",
  setSearchText: (s: string) => set({ searchText: s }),
}));
