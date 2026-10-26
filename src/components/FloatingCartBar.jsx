import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartBar({ onOpenCart }) {
  const { cartItemCount, subtotal } = useCart();
  const location = useLocation();

  // Don't show floating cart if on checkout or cart page already, or if cart is empty
  if (cartItemCount === 0 || location.pathname === '/cart' || location.pathname === '/checkout') {
    return null;
  }

  return (
    <div
      className="floating-cart-bar"
      style={{
        position: 'fixed',
        insetBlockEnd: 'calc(68px + env(safe-area-inset-bottom, 0px))',
        insetInlineStart: '16px',
        insetInlineEnd: '16px',
        zIndex: 990,
        animation: 'dialogFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <button
        onClick={onOpenCart}
        style={{
          inlineSize: '100%',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          paddingInline: '18px',
          paddingBlock: '12px',
          boxShadow: '0 8px 24px rgba(217, 72, 92, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              inlineSize: '30px',
              blockSize: '30px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              display: 'grid',
              placeContent: 'center',
              fontWeight: 800,
              fontSize: '0.82rem',
            }}
          >
            {cartItemCount}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>
              {cartItemCount} Item{cartItemCount > 1 ? 's' : ''} in Bakery Cart
            </div>
            <div style={{ fontSize: '0.74rem', opacity: 0.9 }}>
              ₹{subtotal} • Free delivery above ₹499
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.92rem' }}>
          <span>View Cart</span>
          <ArrowRight size={18} />
        </div>
      </button>
    </div>
  );
}
