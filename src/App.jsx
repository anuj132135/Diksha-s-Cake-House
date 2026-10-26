import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import CakesPage from './pages/CakesPage';
import CakeDetailPage from './pages/CakeDetailPage';
import CombosPage from './pages/CombosPage';
import TrackerPage from './pages/TrackerPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';

function BakeryApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [egglessOnly, setEgglessOnly] = useState(false);

  // Global Cart Drawer & Quick View Modal
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewCake, setQuickViewCake] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <BrowserRouter>
      {/* Scroll to Top and Accessibility Focus Management */}
      <ScrollToTop />

      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {/* Unified Responsive Navigation Bar (Desktop & Mobile) */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Multi-Page Routes */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onQuickView={(cake) => setQuickViewCake(cake)}
                  onShowToast={showToast}
                />
              }
            />
            <Route
              path="/cakes"
              element={
                <CakesPage
                  egglessOnly={egglessOnly}
                  onQuickView={(cake) => setQuickViewCake(cake)}
                  onShowToast={showToast}
                />
              }
            />
            <Route
              path="/cake/:id"
              element={<CakeDetailPage onShowToast={showToast} />}
            />
            <Route
              path="/custom-studio"
              element={<Navigate to="/cakes" replace />}
            />
            <Route
              path="/combos"
              element={<CombosPage onShowToast={showToast} />}
            />
            <Route
              path="/track-order"
              element={<TrackerPage />}
            />
            <Route
              path="/cart"
              element={<CartPage />}
            />
            <Route
              path="/checkout"
              element={<CheckoutPage onShowToast={showToast} />}
            />
            <Route
              path="/wishlist"
              element={<WishlistPage onShowToast={showToast} />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/menu"
              element={<MenuPage onShowToast={showToast} />}
            />
            <Route
              path="/gallery"
              element={<GalleryPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage onShowToast={showToast} />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </main>

        {/* Sticky Floating WhatsApp Button (Bottom Left) */}
        <FloatingWhatsApp />

        {/* Global Footer (Desktop / Mobile) */}
        <Footer onShowToast={showToast} />

        {/* Global Slide-in Cart Drawer */}
        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
          onProceedCheckout={() => {
            setIsCartDrawerOpen(false);
            window.location.href = '/checkout';
          }}
        />

        {/* Quick View Cake Modal */}
        <QuickViewModal
          cake={quickViewCake}
          isOpen={Boolean(quickViewCake)}
          onClose={() => setQuickViewCake(null)}
          onShowToast={showToast}
        />

        {/* Toast Stack */}
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BakeryApp />
    </CartProvider>
  );
}
