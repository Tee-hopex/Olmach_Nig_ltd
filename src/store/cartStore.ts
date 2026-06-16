import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        if (!product.inStock || product.stockCount === 0) return;
        set(state => {
          const existing = state.items.find(i => i.product.id === product.id);
          const currentQty = existing?.quantity ?? 0;
          const canAdd = Math.min(quantity, product.stockCount - currentQty);
          if (canAdd <= 0) return state;
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + canAdd }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: canAdd }] };
        });
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter(i => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId
              ? { ...i, quantity: Math.min(i.product.stockCount, quantity) }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, i) =>
            sum + (i.product.salePrice ?? i.product.price) * i.quantity,
          0
        ),
    }),
    { name: 'Olmach Nig Ltd-cart' }
  )
);
