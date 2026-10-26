import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ADDONS } from '../data/cakes';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, onProceedCheckout }) {
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

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(18, 12, 10, 0.65)',
          backdropFilter: 'blur(4px)',
          animation: 'backdropFadeIn 0.2s ease',
        }}
      />

      {/* Drawer Container */}
      <div
        className="cart-drawer-container"
        style={{
          position: 'relative',
          inlineSize: '100%',
          maxInlineSize: '460px',
          blockSize: '100dvh',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          animation: 'drawerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Your Celebration Cart ({cart.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: 'var(--color-text-muted)',
              display: 'grid',
              placeContent: 'center',
            }}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div
          style={{
            backgroundColor: subtotal >= 499 ? 'var(--color-veg-bg)' : 'var(--color-primary-light)',
            color: subtotal >= 499 ? 'var(--color-veg)' : 'var(--color-primary)',
            paddingInline: '16px',
            paddingBlock: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {subtotal >= 499
            ? '🎉 Congrats! FREE Express 2-Hour Delivery unlocked!'
            : `Add ₹${499 - subtotal} more for FREE Express Delivery!`}
        </div>

        {/* Scrollable Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            scrollbarGutter: 'stable',
            overscrollBehavior: 'contain',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlign: 'center',
                paddingBlock: '40px',
              }}
            >
              <div style={{ fontSize: '3rem', marginBlockEnd: '12px' }}>🍰</div>
              <h3 style={{ fontSize: '1.2rem', marginBlockEnd: '8px' }}>Your cart is empty</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBlockEnd: '20px' }}>
                Explore our oven-fresh handcrafted cakes and add sweetness to your celebration!
              </p>
              <button onClick={onClose} className="btn-primary">
                Browse Cakes
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {cart.map(item => (
                <div
                  key={item.cartId}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      inlineSize: '65px',
                      blockSize: '65px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBlockEnd: '2px' }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          style={{ color: 'var(--color-text-light)', padding: '2px' }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Weight: <strong>{item.weight}</strong>
                      </div>

                      {item.cakeMessage && (
                        <div
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--color-primary)',
                            fontStyle: 'italic',
                            marginBlockStart: '2px',
                          }}
                        >
                          "{item.cakeMessage}"
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockStart: '8px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-primary)' }}>
                        ₹{item.price * item.quantity}
                      </div>

                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--color-surface)',
                          borderRadius: 'var(--radius-full)',
                          paddingInline: '6px',
                          paddingBlock: '3px',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          style={{ color: 'var(--color-text-muted)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          style={{ color: 'var(--color-text-muted)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add-ons Upsell Section */}
              <div style={{ marginBlockStart: '6px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBlockEnd: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={15} color="var(--color-secondary)" />
                  <span>Celebration Add-ons:</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                  {ADDONS.map(addon => {
                    const isAdded = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: isAdded ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                          backgroundColor: isAdded ? 'var(--color-primary-light)' : 'var(--color-surface-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.76rem',
                          textAlign: 'left',
                        }}
                      >
                        <span>{addon.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>
                            {addon.name}
                          </div>
                          <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                            +₹{addon.price}
                          </div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isAdded ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                          {isAdded ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coupon Code Section */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, marginBlockEnd: '8px' }}>
                  <Tag size={15} color="var(--color-primary)" />
                  <span>Apply Promo Code:</span>
                </div>

                {appliedCoupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--color-veg-bg)', color: 'var(--color-veg)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700 }}>
                    <div>
                      {couponCode} Applied ({appliedCoupon.description})
                    </div>
                    <button onClick={removeCoupon} style={{ color: 'var(--color-text-muted)', fontSize: '0.74rem', textDecoration: 'underline' }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        placeholder="e.g. DIKSHA10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                        style={{
                          flex: 1,
                          paddingInline: '10px',
                          paddingBlock: '6px',
                          fontSize: '0.82rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-surface)',
                          color: 'var(--color-text-main)',
                          outline: 'none',
                        }}
                      />
                      <button
                        onClick={() => {
                          const res = applyCoupon(inputCoupon);
                          if (res) setInputCoupon('');
                        }}
                        className="btn-secondary"
                        style={{ paddingInline: '14px', paddingBlock: '6px', fontSize: '0.82rem' }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div style={{ color: '#EF4444', fontSize: '0.72rem', marginBlockStart: '4px' }}>
                        {couponError}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Price Summary & Checkout Button */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.82rem', marginBlockEnd: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>

              {addonsTotal > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Add-ons:</span>
                  <span>+₹{addonsTotal}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Express Delivery:</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--color-veg)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontWeight: 700 }}>
                  <span>Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, paddingBlockStart: '6px', borderTop: '1px solid var(--color-border)', marginBlockStart: '4px' }}>
                <span>To Pay:</span>
                <span style={{ color: 'var(--color-primary)' }}>₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="btn-primary"
              style={{ inlineSize: '100%', paddingBlock: '12px', fontSize: '0.96rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
