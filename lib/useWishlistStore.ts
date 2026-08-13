"use client";

import { create } from "zustand";
import axios from "axios";
import type { IProduct } from "@/types";

interface WishlistState {
  ids: Set<string>;
  loaded: boolean;
  load: () => Promise<void>;
  toggle: (productId: string) => Promise<boolean>;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  ids: new Set(),
  loaded: false,

  load: async () => {
    try {
      const { data } = await axios.get<{ products: IProduct[] }>("/api/wishlist");
      set({ ids: new Set(data.products.map((p) => p._id)), loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  toggle: async (productId) => {
    const { data } = await axios.post<{ added: boolean; products: string[] }>("/api/wishlist", {
      productId,
    });
    const ids = new Set(get().ids);
    if (data.added) ids.add(productId);
    else ids.delete(productId);
    set({ ids });
    return data.added;
  },

  has: (productId) => get().ids.has(productId),
}));
