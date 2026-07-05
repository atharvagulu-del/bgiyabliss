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
  if (appliedPromo && cartSubtotal >= (appliedPromo.minOrderValue || 0)) {
    if (appliedPromo.discountType === 'percent') {
      discountAmount = cartSubtotal * (appliedPromo.discountValue / 100);
      if (appliedPromo.maxDiscount && discountAmount > appliedPromo.maxDiscount) {
        discountAmount = appliedPromo.maxDiscount;
      }
    } else {
      discountAmount = appliedPromo.discountValue;
    }
  }
  
  const cartTotal = cartSubtotal - discountAmount;
  const gstAmount = Math.round(cartTotal * 0.05);

  // Calculate total weight in grams
  const cartTotalWeight = cartItems.reduce((total, item) => {
    let itemWeightGrams = 0;
    const nameStr = (item.name || '').toLowerCase();
    const weightStr = item.weight || item.details?.Weight || item.variantLabel || '';
    
    // Hard override for 5-in-1 which is incorrectly 10kg in variant/DB
    if (nameStr.includes('5 in 1') || nameStr.includes('5 in one') || nameStr.includes('5-in-1')) {
      itemWeightGrams = 3700;
    } else {
      if (weightStr) {
        const match = weightStr.toString().match(/(\d+(?:\.\d+)?)\s*(kg|g|ml|l)/i);
        if (match) {
          const val = parseFloat(match[1]);
          const unit = match[2].toLowerCase();
          if (unit === 'kg' || unit === 'l') {
            itemWeightGrams = val * 1000;
          } else {
            itemWeightGrams = val;
          }
        }
      }
    }
    // Default to 1kg if not found
    if (itemWeightGrams === 0) itemWeightGrams = 1000;
    
    let pack = 1;
    const packMatch = weightStr.toString().match(/pack of\s*(\d+)/i);
    if (packMatch) pack = parseInt(packMatch[1]);
    
    return total + (itemWeightGrams * pack * item.quantity);
  }, 0);


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
        gstAmount,
        discountAmount,
        appliedPromo,
        setAppliedPromo,
        cartCount,
        clearCart,
        showConfetti,
        cartTotalWeight,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
