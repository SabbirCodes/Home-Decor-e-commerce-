"use client";

import { create } from "zustand";
import axios from "axios";
import type { IProduct } from "@/types";

interface WishlistState {
  items: IProduct[];
  ids: Set<string>;
  loaded: boolean;
  load: () => Promise<void>;
  toggle: (product: IProduct) => Promise<boolean>;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  ids: new Set(),
  loaded: false,

  load: async () => {
    try {
      const { data } = await axios.get<{ products: IProduct[] }>("/api/wishlist");
      const products = data.products || [];
      set({
        items: products,
        ids: new Set(products.map((p) => p._id)),
        loaded: true,
      });
    } catch {
      set({ loaded: true });
    }
  },

  toggle: async (product) => {
    const { items, ids } = get();
    const isPresent = ids.has(product._id);

    // 1. Save snapshots for rollback
    const prevItems = [...items];
    const prevIds = new Set(ids);

    // 2. Perform Optimistic Update immediately
    const nextIds = new Set(ids);
    let nextItems: IProduct[];

    if (isPresent) {
      nextIds.delete(product._id);
      nextItems = items.filter((p) => p._id !== product._id);
    } else {
      nextIds.add(product._id);
      nextItems = [...items, product];
    }

    set({ ids: nextIds, items: nextItems });

    // 3. Fire server request in background
    try {
      const { data } = await axios.post<{ added: boolean }>("/api/wishlist", {
        productId: product._id,
      });
      return data.added;
    } catch (error) {
      // 4. Rollback state if backend request fails
      set({ ids: prevIds, items: prevItems });
      throw error;
    }
  },

  has: (productId) => get().ids.has(productId),
}));