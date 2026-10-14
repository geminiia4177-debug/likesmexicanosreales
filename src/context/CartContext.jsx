import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'lmx_cart_v2';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === product.id && i.targetUrl === product.targetUrl
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex].quantity += product.quantity || 1;
        copy[existingIndex].total = copy[existingIndex].quantity * copy[existingIndex].unitPrice;
        return copy;
      }
      const unitPrice = Number(product.unitPrice || product.price || 0);
      const qty = Number(product.quantity || 1);
      return [
        ...prev,
        {
          id: product.id || `item_${Date.now()}`,
          title: product.title || product.name || 'Servicio Digital',
          category: product.category || 'Interacciones MX',
          quantity: qty,
          unitPrice: unitPrice,
          total: qty * unitPrice,
          targetUrl: product.targetUrl || '',
          targetHandle: product.targetHandle || '',
          serviceId: product.serviceId || 'mx_service',
          icon: product.icon || null,
          details: product.details || {},
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  const cartCount = items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
