import { create } from 'zustand';
import { CartItem, Vegetable } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (vegetable: Vegetable) => void;
  removeItem: (vegetableId: string) => void;
  updateQuantity: (vegetableId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (vegetable) => {
    const items = get().items;
    const existingItem = items.find(item => item.vegetable.id === vegetable.id);

    if (existingItem) {
      set({
        items: items.map(item =>
          item.vegetable.id === vegetable.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { vegetable, quantity: 1 }] });
    }
  },
  removeItem: (vegetableId) => {
    set({ items: get().items.filter(item => item.vegetable.id !== vegetableId) });
  },
  updateQuantity: (vegetableId, quantity) => {
    set({
      items: get().items.map(item =>
        item.vegetable.id === vegetableId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce(
      (sum, item) => sum + item.vegetable.price * item.quantity,
      0
    );
  },
}));