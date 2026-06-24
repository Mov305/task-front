import { create } from "zustand";
import type { Product } from "../types";
import productsData from "../data/products.json";
import {
  initialQuantities,
  initialActiveVariants,
} from "../data/initialSelections";

interface BundleState {
  products: Product[];
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  activeStep: number;

  getQuantity: (productId: string, variantId?: string) => number;
  setQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  increment: (productId: string, variantId?: string) => void;
  decrement: (productId: string, variantId?: string) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setActiveStep: (step: number) => void;
  toggleStep: (step: number) => void;

  getSelectedCountForStep: (step: number) => number;
  getSelectedItems: () => SelectedItem[];
  getSubtotal: () => number;
  getCompareAtTotal: () => number;
  getSavings: () => number;

  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;
}

export interface SelectedItem {
  product: Product;
  variantId?: string;
  variantName?: string;
  quantity: number;
  image: string;
  thumbnail: string;
  linePrice: number;
}

export const useBundleStore = create<BundleState>((set, get) => ({
  products: productsData as Product[],
  quantities: { ...initialQuantities },
  activeVariant: { ...initialActiveVariants },
  activeStep: 1,

  getQuantity: (productId, variantId) => {
    const key = variantId ? `${productId}:${variantId}` : productId;
    return get().quantities[key] || 0;
  },

  setQuantity: (productId, variantId, qty) => {
    const key = variantId ? `${productId}:${variantId}` : productId;
    set((state) => ({
      quantities: {
        ...state.quantities,
        [key]: Math.max(0, qty),
      },
    }));
  },

  increment: (productId, variantId) => {
    const key = variantId ? `${productId}:${variantId}` : productId;
    set((state) => ({
      quantities: {
        ...state.quantities,
        [key]: (state.quantities[key] || 0) + 1,
      },
    }));
  },

  decrement: (productId, variantId) => {
    const key = variantId ? `${productId}:${variantId}` : productId;
    const product = get().products.find((p) => p.id === productId);
    const minQty = product?.isRequired ? 1 : 0;
    set((state) => {
      const current = state.quantities[key] || 0;
      if (current <= minQty) return state;
      return {
        quantities: {
          ...state.quantities,
          [key]: current - 1,
        },
      };
    });
  },

  setActiveVariant: (productId, variantId) => {
    set((state) => ({
      activeVariant: {
        ...state.activeVariant,
        [productId]: variantId,
      },
    }));
  },

  setActiveStep: (step) => {
    set({ activeStep: step });
  },

  toggleStep: (step) => {
    set((state) => ({
      activeStep: state.activeStep === step ? -1 : step,
    }));
  },

  getSelectedCountForStep: (step) => {
    const { products, quantities } = get();
    const stepProducts = products.filter((p) => p.step === step);
    let count = 0;
    for (const product of stepProducts) {
      if (product.variants) {
        for (const variant of product.variants) {
          if ((quantities[`${product.id}:${variant.id}`] || 0) > 0) {
            count++;
          }
        }
      } else {
        if ((quantities[product.id] || 0) > 0) {
          count++;
        }
      }
    }
    return count;
  },

  getSelectedItems: () => {
    const { products, quantities } = get();
    const items: SelectedItem[] = [];

    for (const product of products) {
      if (product.variants) {
        for (const variant of product.variants) {
          const key = `${product.id}:${variant.id}`;
          const qty = quantities[key] || 0;
          if (qty > 0) {
            items.push({
              product,
              variantId: variant.id,
              variantName: variant.name,
              quantity: qty,
              image: variant.image,
              thumbnail: variant.thumbnail || product.thumbnail || variant.image,
              linePrice: product.isFree ? 0 : product.price * qty,
            });
          }
        }
      } else {
        const qty = quantities[product.id] || 0;
        if (qty > 0) {
          items.push({
            product,
            quantity: qty,
            image: product.image,
            thumbnail: product.thumbnail || product.image,
            linePrice: product.isFree ? 0 : product.price * qty,
          });
        }
      }
    }

    return items;
  },

  getSubtotal: () => {
    return get()
      .getSelectedItems()
      .reduce((sum, item) => sum + item.linePrice, 0);
  },

  getCompareAtTotal: () => {
    return get()
      .getSelectedItems()
      .reduce((sum, item) => {
        const compareAt = item.product.compareAtPrice ?? item.product.price;
        return sum + compareAt * item.quantity;
      }, 0);
  },

  getSavings: () => {
    return get().getCompareAtTotal() - get().getSubtotal();
  },

  saveToLocalStorage: () => {
    const { quantities, activeVariant, activeStep } = get();
    localStorage.setItem(
      "bundle-builder-saved-system",
      JSON.stringify({ quantities, activeVariant, activeStep })
    );
  },

  loadFromLocalStorage: () => {
    const saved = localStorage.getItem("bundle-builder-saved-system");
    if (!saved) return false;
    try {
      const { quantities, activeVariant, activeStep } = JSON.parse(saved);
      set({ quantities, activeVariant, activeStep });
      return true;
    } catch {
      return false;
    }
  },
}));
