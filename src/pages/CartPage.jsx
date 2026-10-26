import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ADDONS } from '../data/cakes';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    selectedAddons,
    toggleAddon,
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
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBlockEnd: '24px' }}>
          <button
            onClick={() => navigate('/cakes')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              marginBlockEnd: '12px',
            }}
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping Cakes</span>
          </button>
          <h1 style={{ fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', fontWeight: 800 }}>
            Your Celebration Cart ({cart.length})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '60px 24px',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBlockEnd: '14px' }}>🍰</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              Your cart is currently empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', marginBlockEnd: '24px' }}>
              Treat yourself and loved ones with freshly baked artisanal cakes!
            </p>
            <Link to="/cakes" className="btn-primary" style={{ paddingInline: '26px', paddingBlock: '12px' }}>
              Browse Fresh Cakes Menu
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Free delivery bar */}
              <div
                style={{
                  backgroundColor: subtotal >= 499 ? 'var(--color-veg-bg)' : 'var(--color-primary-light)',
                  color: subtotal >= 499 ? 'var(--color-veg)' : 'var(--color-primary)',
                  paddingInline: '20px',
                  paddingBlock: '10px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {subtotal >= 499
                  ? '🎉 You have unlocked FREE Express Delivery!'
                  : `Add ₹${499 - subtotal} more for FREE Express 2-Hour Delivery!`}
              </div>

              {/* Items */}
              {cart.map(item => (
                <div
                  key={item.cartId}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      inlineSize: '90px',
                      blockSize: '90px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          style={{ color: 'var(--color-text-light)', padding: '4px' }}
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBlock: '2px' }}>
                        Size: <strong>{item.weight}</strong>
                      </div>

                      {item.cakeMessage && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontStyle: 'italic' }}>
                          Piping text: "{item.cakeMessage}"
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockStart: '12px' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                        ₹{item.price * item.quantity}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: 'var(--color-surface-subtle)',
                          borderRadius: 'var(--radius-full)',
                          paddingInline: '8px',
                          paddingBlock: '4px',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          style={{ color: 'var(--color-text-muted)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          style={{ color: 'var(--color-text-muted)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Addons Strip */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', marginBlockEnd: '12px' }}>
                  <Sparkles size={18} color="var(--color-secondary)" />
                  <span>Celebration Accessories:</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {ADDONS.map(addon => {
                    const isAdded = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: isAdded ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          backgroundColor: isAdded ? 'var(--color-primary-light)' : 'var(--color-surface-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.82rem',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{addon.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{addon.name}</div>
                          <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>+₹{addon.price}</div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isAdded ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                          {isAdded ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout Trigger */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                padding: '28px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                position: 'sticky',
                insetBlockStart: '100px',
              }}
            >
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBlockEnd: '16px' }}>
                Order Summary
              </h2>

              {/* Promo Coupon Box */}
              <div style={{ marginBlockEnd: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBlockEnd: '6px' }}>
                  Have a Promo Code?
                </label>
                {appliedCoupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--color-veg-bg)', color: 'var(--color-veg)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700 }}>
                    <div>{couponCode} Applied ({appliedCoupon.description})</div>
                    <button onClick={removeCoupon} style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', textDecoration: 'underline' }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="e.g. DIKSHA10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          fontSize: '0.86rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-surface-subtle)',
                          outline: 'none',
                        }}
                      />
                      <button
                        onClick={() => {
                          const res = applyCoupon(inputCoupon);
                          if (res) setInputCoupon('');
                        }}
                        className="btn-secondary"
                        style={{ paddingInline: '16px' }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div style={{ color: '#EF4444', fontSize: '0.76rem', marginBlockStart: '6px' }}>
                        {couponError}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBlockEnd: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Cakes Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>

                {addonsTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Accessories:</span>
                    <span>+₹{addonsTotal}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Express 2-Hr Delivery:</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--color-veg)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontWeight: 700 }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    paddingBlockStart: '14px',
                    borderTop: '1px solid var(--color-border)',
                    marginBlockStart: '6px',
                  }}
                >
                  <span>Grand Total:</span>
                  <span style={{ color: 'var(--color-primary)' }}>₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary"
                style={{ inlineSize: '100%', paddingBlock: '14px', fontSize: '1.02rem' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
