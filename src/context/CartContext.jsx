import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUPONS } from '../data/cakes';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('diksha_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('diksha_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('diksha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Add-ons
  const [selectedAddons, setSelectedAddons] = useState(() => {
    try {
      const saved = localStorage.getItem('diksha_addons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('diksha_wishlist');
      return saved ? JSON.parse(saved) : ['diksha-signature-truffle', 'red-velvet-cream-cheese'];
    } catch {
      return [];
    }
  });

  // Applied Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Active / Placed Order for Tracking
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('diksha_active_order');
      if (saved) return JSON.parse(saved);
      // Demo active order for instant tracking exploration
      return {
        orderId: 'DKB-78219',
        customerName: 'Aarav Singhania',
        phone: '+91 85650 98470',
        address: 'Villa 14, Rosewood Enclave, South City',
        slot: 'Midnight Surprise (11:30 PM - 12:00 AM)',
        status: 'decorating', // placed -> baking -> decorating -> packaging -> out_for_delivery -> delivered
        statusStep: 3,
        estimatedTime: '45 mins remaining',
        riderName: 'Vikram Singh',
        riderPhone: '+91 99887 76655',
        placedAt: new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [
          { name: 'Diksha Royal Belgian Truffle', weight: '1.0 kg', price: 1299, quantity: 1, message: 'Happy 25th Diksha! ❤️' }
        ],
        totalAmount: 1348,
      };
    } catch {
      return null;
    }
  });

  // Save Cart to localStorage
  useEffect(() => {
    localStorage.setItem('diksha_cart', JSON.stringify(cart));
  }, [cart]);

  // Save Addons to localStorage
  useEffect(() => {
    localStorage.setItem('diksha_addons', JSON.stringify(selectedAddons));
  }, [selectedAddons]);

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem('diksha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save Active Order
  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('diksha_active_order', JSON.stringify(activeOrder));
    }
  }, [activeOrder]);

  // Add Item to Cart
  const addToCart = (item) => {
    setCart(prev => {
      // Find if exact same cake, weight, and cakeMessage already exists
      const existingIndex = prev.findIndex(
        i => i.id === item.id && i.weight === item.weight && i.cakeMessage === item.cakeMessage
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }

      return [
        ...prev,
        {
          ...item,
          cartId: `${item.id}-${item.weight}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          quantity: item.quantity || 1,
          cakeMessage: item.cakeMessage || '',
        }
      ];
    });
  };

  // Remove Item
  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  };

  // Update Item Quantity
  const updateQuantity = (cartId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setSelectedAddons([]);
    setAppliedCoupon(null);
  };

  // Toggle Add-on
  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  // Wishlist toggle
  const toggleWishlist = (cakeId) => {
    setWishlist(prev => {
      if (prev.includes(cakeId)) {
        return prev.filter(id => id !== cakeId);
      }
      return [...prev, cakeId];
    });
  };

  const isInWishlist = (cakeId) => wishlist.includes(cakeId);

  // Apply Coupon
  const applyCoupon = (code) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    const coupon = COUPONS[cleanCode];
    if (!coupon) {
      setCouponError('Invalid promo code. Try DIKSHA10 or FIRSTBAKE');
      return false;
    }

    if (subtotal < coupon.minOrder) {
      setCouponError(`Requires minimum order of ₹${coupon.minOrder}`);
      return false;
    }

    setCouponCode(cleanCode);
    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  let discountAmount = 0;
  let deliveryFee = subtotal >= 499 || (appliedCoupon && appliedCoupon.freeDelivery) ? 0 : 50;
  if (subtotal === 0) deliveryFee = 0;

  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFlat) {
      discountAmount = Math.min(appliedCoupon.discountFlat, subtotal);
    }
  }

  const grandTotal = Math.max(0, subtotal + addonsTotal + deliveryFee - discountAmount);

  // Place Order function
  const placeOrder = (details) => {
    const newOrderId = `DKB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId: newOrderId,
      customerName: details.name,
      phone: details.phone,
      address: `${details.address}, ${details.city} - ${details.pincode}`,
      slot: details.deliverySlot || 'Standard Delivery',
      deliveryDate: details.deliveryDate || 'Today',
      specialInstructions: details.instructions || '',
      paymentMethod: details.paymentMethod || 'UPI',
      status: 'placed',
      statusStep: 1,
      estimatedTime: '2 hours',
      riderName: 'Ramesh Verma',
      riderPhone: '+91 98112 34567',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cart.map(i => ({
        name: i.name,
        weight: i.weight,
        price: i.price,
        quantity: i.quantity,
        message: i.cakeMessage,
        customSpecs: i.customSpecs
      })),
      addons: selectedAddons,
      subtotal,
      discountAmount,
      deliveryFee,
      totalAmount: grandTotal,
    };

    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedAddons,
        toggleAddon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cartItemCount,
        subtotal,
        addonsTotal,
        deliveryFee,
        discountAmount,
        grandTotal,
        couponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        activeOrder,
        setActiveOrder,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
