import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  customMeasurements?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          // Create a unique ID based on product + size + measurements so different sizes don't merge
          const uniqueId = `${newItem.productId}-${newItem.size}-${newItem.customMeasurements || 'standard'}`;
          
          const existingItem = state.items.find((item) => item.id === uniqueId);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === uniqueId ? { ...item, quantity: item.quantity + newItem.quantity } : item
              ),
            };
          }
          return { items: [...state.items, { ...newItem, id: uniqueId }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'konka-venus-cart', // This saves the cart in local storage
    }
  )
);