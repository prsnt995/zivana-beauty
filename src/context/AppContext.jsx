import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_USER,
  INITIAL_CMS,
  INITIAL_COUPONS,
  INITIAL_CUSTOMERS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View state
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Store state initialized from LocalStorage or Defaults
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('zivana_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('zivana_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('zivana_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('zivana_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('zivana_wishlist');
    return saved ? JSON.parse(saved) : ['ziv-001', 'ziv-004'];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('zivana_user');
    return saved ? JSON.parse(saved) : { ...INITIAL_USER, isLoggedIn: true };
  });

  const [cms, setCms] = useState(() => {
    const saved = localStorage.getItem('zivana_cms');
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('zivana_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync states to LocalStorage
  useEffect(() => {
    localStorage.setItem('zivana_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zivana_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zivana_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zivana_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('zivana_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zivana_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem('zivana_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('zivana_customers', JSON.stringify(customers));
  }, [customers]);

  // Toast Notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // View Navigation Helpers
  const navigateTo = (view, payload = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'product-detail' && payload) {
      setSelectedProduct(payload);
    }
    if (view === 'shop' && typeof payload === 'string') {
      setSelectedCategory(payload);
    }
    setCurrentView(view);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart`);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  // Coupon Application
  const applyCouponCode = (code) => {
    const formatted = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === formatted && c.active);
    if (!found) {
      showToast('Invalid or expired coupon code', 'error');
      return false;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (found.minSpend && subtotal < found.minSpend) {
      showToast(`Minimum order of ₹${found.minSpend} required for code ${formatted}`, 'error');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${formatted}" applied successfully! 🎉`);
    return true;
  };

  // Order Placement
  const placeOrder = (orderData) => {
    const newOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      customer: orderData.customer,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      deliveryFee: orderData.deliveryFee,
      gst: orderData.gst,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (COD)' : 'Paid',
      orderStatus: 'Placed',
      trackingId: `AWB-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: 'Bluedart Express',
      gstin: orderData.gstin || null
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    showToast(`Order #${newOrderId} placed successfully!`);
    navigateTo('account');
    return newOrder;
  };

  // Admin Management Operations
  const addProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" created!`);
  };

  const editProduct = (updatedProd) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    showToast(`Product "${updatedProd.name}" updated!`);
  };

  const deleteProduct = (prodId) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    showToast('Product deleted from inventory', 'info');
  };

  const quickUpdateStock = (prodId, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === prodId) {
          const newStock = Math.max(0, (p.stock || 0) + delta);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
    showToast(`Inventory stock adjusted`);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: newStatus } : ord))
    );
    showToast(`Order ${orderId} status updated to "${newStatus}"`);
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Order ${orderId} removed from records`, 'info');
  };

  const updateCMSData = (newCMS) => {
    setCms(newCMS);
    showToast('Homepage CMS updated successfully!');
  };

  const addCoupon = (newCoupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon "${newCoupon.code}" created!`);
  };

  const deleteCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon "${code}" deleted`, 'info');
  };

  const toggleCoupon = (code) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
    showToast(`Coupon status toggled`);
  };

  const updateCustomerPoints = (customerId, pointsDelta) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const newPoints = Math.max(0, (c.glowPoints || 0) + pointsDelta);
          return { ...c, glowPoints: newPoints };
        }
        return c;
      })
    );
    showToast(`Glow Points updated for customer`);
  };

  // Authentication helpers
  const loginUser = (userData, redirectView = 'account') => {
    const updatedUser = {
      ...INITIAL_USER,
      ...user,
      ...userData,
      isLoggedIn: true
    };
    setUser(updatedUser);
    localStorage.setItem('zivana_user', JSON.stringify(updatedUser));
    showToast(`Welcome back, ${updatedUser.name || 'Glow Member'}! ✨`);
    navigateTo(redirectView);
  };

  const logoutUser = () => {
    const updatedUser = {
      ...user,
      isLoggedIn: false
    };
    setUser(updatedUser);
    localStorage.setItem('zivana_user', JSON.stringify(updatedUser));
    showToast('You have been signed out safely.', 'info');
    navigateTo('login');
  };

  const registerUser = (newUserData, redirectView = 'account') => {
    const newUser = {
      name: newUserData.fullName || newUserData.name || 'VIP Member',
      email: newUserData.email || '',
      phone: newUserData.phone || '+91 98765 43210',
      isLoggedIn: true,
      points: 100,
      tier: 'Privé Club Member',
      memberSince: '2026',
      addresses: newUserData.address ? [
        {
          id: 'addr-1',
          title: 'Home',
          fullName: newUserData.fullName || newUserData.name,
          phone: newUserData.phone,
          street: newUserData.address || 'MG Road',
          city: newUserData.city || 'Bengaluru',
          state: newUserData.state || 'Karnataka',
          pincode: newUserData.pincode || '560001',
          isDefault: true
        }
      ] : INITIAL_USER.addresses
    };

    setUser(newUser);
    localStorage.setItem('zivana_user', JSON.stringify(newUser));

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    showToast(`Welcome to ZIVANA Privé, ${newUser.name}! ₹500 welcome voucher unlocked 🎉`);
    navigateTo(redirectView);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        products,
        orders,
        customers,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        user,
        setUser,
        loginUser,
        logoutUser,
        registerUser,
        cms,
        coupons,
        appliedCoupon,
        setAppliedCoupon,
        applyCouponCode,
        placeOrder,
        addProduct,
        editProduct,
        deleteProduct,
        quickUpdateStock,
        updateOrderStatus,
        deleteOrder,
        updateCMSData,
        addCoupon,
        deleteCoupon,
        toggleCoupon,
        updateCustomerPoints,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
