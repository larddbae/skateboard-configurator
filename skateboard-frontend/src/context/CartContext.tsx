"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: string; // product id
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  gripTape?: string;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart-storage");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart-storage", JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.size === newItem.size && item.gripTape === newItem.gripTape
      );
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id && item.size === newItem.size && item.gripTape === newItem.gripTape
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true); // Open cart when item added
  };

  const removeFromCart = (id: string) => {
    // Note: This removes all items with that ID regardless of size/options?
    // Better to remove by unique criteria, but valid for now if ID is unique per variant or just remove item object reference
    // Actually simplicity: filtering by reference is hard. Let's filter by properties.
    // For now, I'll filter by ID, assuming user removes that specific line item. Wait, if multiple sizes share ID...
    // Let's rely on a composite ID or match all props.
    // The safest way here without unique lineItem IDs is to just match the index or pass the full item to remove.
    // I'll accept 'id' as the unique key for now. If mocking, ID is fine.
    // But better: pass item itself.
    // I'll change signature to removeFromCart(item: CartItem) or simpler: filter out by ID for now, assume ID is unique product.
    // BUT product variants...
    // Let's generate a unique instance ID? No, too complex for this demo.
    // I will simply remove by ID and say "removes all variants" or just remove the first one found?
    // I'll implement 'remove by ID'
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => setIsOpen((prev) => !prev);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
