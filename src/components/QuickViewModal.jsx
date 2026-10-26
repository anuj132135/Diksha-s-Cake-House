import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useDialogFallback } from '../hooks/useDialogFallback';
import { X, Star, Heart, ShieldCheck, Clock, Sparkles, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function QuickViewModal({ cake, isOpen, onClose, onShowToast }) {
  const dialogRef = useRef(null);
  useDialogFallback(dialogRef, isOpen, onClose);

  const { addToCart, isInWishlist, toggleWishlist, cart, updateQuantity } = useCart();
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [cakeMessage, setCakeMessage] = useState('');

  // Reset weight and message when cake changes
  useEffect(() => {
    if (cake) {
      setSelectedWeightIndex(0);
      setCakeMessage('');
    }
  }, [cake]);

  if (!cake) return null;

  const currentWeightObj = cake.weights[selectedWeightIndex] || cake.weights[0];
  const currentPrice = currentWeightObj.price;
  const currentWeight = currentWeightObj.weight;

  const isFavorited = isInWishlist(cake.id);
  const cartItem = cart.find(i => i.id === cake.id && i.weight === currentWeight);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id: cake.id,
      name: cake.name,
      image: cake.image,
      weight: currentWeight,
      price: currentPrice,
      isEggless: cake.isEggless,
      cakeMessage: cakeMessage.trim(),
      quantity: 1,
    });

    onShowToast?.(`Added "${cake.name} (${currentWeight})" to cart! 🍰`, 'success');
  };

  return (
    <dialog
      ref={dialogRef}
      id="quickViewDialog"
      closedby="any"
      aria-labelledby="dialogCakeTitle"
      style={{
        width: 'min(94vw, 760px)',
        padding: 0,
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Mobile Grab Handle Bar (Shows on mobile bottom sheet) */}
        <div className="sheet-handle" />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            insetBlockStart: '14px',
            insetInlineEnd: '14px',
            inlineSize: '36px',
            blockSize: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            color: 'var(--color-text-main)',
            display: 'grid',
            placeContent: 'center',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          }}
        >
          {/* Cake Image Showcase */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-surface-subtle)',
              minHeight: '260px',
            }}
          >
            <img
              src={cake.image}
              alt={cake.name}
              style={{
                inlineSize: '100%',
                blockSize: '100%',
                objectFit: 'cover',
                maxHeight: '440px',
              }}
            />
            {/* Dietary Badge */}
            <div
              style={{
                position: 'absolute',
                insetBlockStart: '16px',
                insetInlineStart: '16px',
              }}
            >
              <span className="veg-tag" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                <span className="veg-symbol" /> 100% Eggless
              </span>
            </div>
          </div>

          {/* Details Content */}
          <div
            style={{
              padding: 'clamp(16px, 3.5vw, 28px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              {/* Rating & Favorite */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBlockEnd: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-star)', fontWeight: 700 }}>
                  <Star size={16} fill="var(--color-star)" />
                  <span>{cake.rating}</span>
                  <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                    ({cake.reviewsCount} reviews)
                  </span>
                </div>

                <button
                  onClick={() => toggleWishlist(cake.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: isFavorited ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  <Heart size={18} fill={isFavorited ? 'var(--color-primary)' : 'none'} />
                  <span>{isFavorited ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Title */}
              <h2
                id="dialogCakeTitle"
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: 800,
                  marginBlockEnd: '6px',
                }}
              >
                {cake.name}
              </h2>

              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.55,
                  marginBlockEnd: '14px',
                }}
              >
                {cake.description}
              </p>

              {/* Ingredients & Allergens Pills */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.78rem',
                  marginBlockEnd: '14px',
                  lineHeight: 1.6,
                }}
              >
                <div>
                  <strong>Key Ingredients:</strong> {cake.ingredients ? cake.ingredients.join(', ') : 'Belgian Chocolate, Pure Butter, Cream'}
                </div>
                <div>
                  <strong>Allergen Info:</strong> {cake.allergens || 'Contains Dairy. 100% Vegetarian.'}
                </div>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBlockStart: '4px' }}>
                  <Clock size={13} /> {cake.prepTime}
                </div>
              </div>

              {/* Weight Selector */}
              <div style={{ marginBlockEnd: '14px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBlockEnd: '8px', textTransform: 'uppercase' }}>
                  Select Cake Weight:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {cake.weights.map((w, idx) => (
                    <button
                      key={w.weight}
                      onClick={() => setSelectedWeightIndex(idx)}
                      style={{
                        paddingInline: '12px',
                        paddingBlock: '6px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: selectedWeightIndex === idx
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border)',
                        backgroundColor: selectedWeightIndex === idx
                          ? 'var(--color-primary-light)'
                          : 'var(--color-surface)',
                        color: selectedWeightIndex === idx
                          ? 'var(--color-primary)'
                          : 'var(--color-text-main)',
                      }}
                    >
                      {w.weight} • ₹{w.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message on Cake Input */}
              <div style={{ marginBlockEnd: '12px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBlockEnd: '6px' }}>
                  Free Inscription Message on Cake:
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday Diksha! 🎂"
                  style={{
                    inlineSize: '100%',
                    paddingInline: '12px',
                    paddingBlock: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Bottom Footer Price & Add */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBlockStart: '14px',
                borderTop: '1px solid var(--color-border)',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                  Total ({currentWeight})
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                  }}
                >
                  ₹{currentPrice}
                </div>
              </div>

              {inCartQty > 0 ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-full)',
                    paddingInline: '12px',
                    paddingBlock: '8px',
                    border: '1.5px solid var(--color-primary)',
                  }}
                >
                  <button
                    onClick={() => updateQuantity(cartItem.cartId, -1)}
                    style={{ color: 'var(--color-primary)' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>

                  <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-primary)', minWidth: '20px', textAlign: 'center' }}>
                    {inCartQty} in cart
                  </span>

                  <button
                    onClick={() => updateQuantity(cartItem.cartId, 1)}
                    style={{ color: 'var(--color-primary)' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="btn-primary"
                  style={{ paddingInline: '22px', paddingBlock: '12px' }}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
