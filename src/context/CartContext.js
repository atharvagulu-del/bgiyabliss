'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load from local storage initially
  useEffect(() => {
    const storedCart = localStorage.getItem('bgiya-cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('bgiya-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    // Trigger confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const [appliedPromo, setAppliedPromo] = useState(null);

  const cartSubtotal = cartItems.reduce((total, item) => total + (item.salePrice * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo === 'BLISS20' && cartSubtotal >= 1099) {
    discountAmount = cartSubtotal * 0.20;
  } else if (appliedPromo === 'BLISS10') {
    discountAmount = cartSubtotal * 0.10;
  }
  
  const cartTotal = cartSubtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartSubtotal,
        cartTotal,
        discountAmount,
        appliedPromo,
        setAppliedPromo,
        cartCount,
        clearCart,
        showConfetti,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
