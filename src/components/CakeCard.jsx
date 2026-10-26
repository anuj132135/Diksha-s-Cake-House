import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Heart, Eye, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CakeCard({ cake, onQuickView, onShowToast }) {
  const { addToCart, isInWishlist, toggleWishlist, cart, updateQuantity } = useCart();

  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [cakeMessage, setCakeMessage] = useState('');
  const [showMessageInput, setShowMessageInput] = useState(false);

  const currentWeightObj = cake.weights[selectedWeightIndex] || cake.weights[0];
  const currentPrice = currentWeightObj.price;
  const currentWeight = currentWeightObj.weight;

  // Check if this exact cake and weight is in cart
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

    onShowToast?.(`Added "${cake.name} (${currentWeight})" to your cart! 🍰`, 'success');
  };

  const isFavorited = isInWishlist(cake.id);

  return (
    <article
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Media Image Container with aspect-ratio: 4 / 3 and Link to /cake/:id */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          overflow: 'clip',
          backgroundColor: 'var(--color-surface-subtle)',
        }}
      >
        <Link to={`/cake/${cake.id}`} style={{ display: 'block', inlineSize: '100%', blockSize: '100%' }}>
          <img
            src={cake.image}
            alt={cake.name}
            loading="lazy"
            style={{
              inlineSize: '100%',
              blockSize: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            insetBlockStart: '10px',
            insetInlineStart: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'flex-start',
            pointerEvents: 'none',
          }}
        >
          {cake.badge && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: 'rgba(217, 72, 92, 0.92)',
                color: '#FFFFFF',
                paddingInline: '8px',
                paddingBlock: '3px',
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            >
              {cake.badge}
            </span>
          )}

          {cake.isEggless && (
            <span
              className="veg-tag"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <span className="veg-symbol" /> Eggless
            </span>
          )}
        </div>

        {/* Top Right Action Buttons (Wishlist & Quick View) */}
        <div
          style={{
            position: 'absolute',
            insetBlockStart: '10px',
            insetInlineEnd: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(cake.id);
              onShowToast?.(
                isFavorited
                  ? `Removed ${cake.name} from favorites`
                  : `Saved ${cake.name} to favorites ❤️`,
                'info'
              );
            }}
            style={{
              inlineSize: '34px',
              blockSize: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              display: 'grid',
              placeContent: 'center',
              color: isFavorited ? 'var(--color-primary)' : 'var(--color-text-muted)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              transition: 'transform var(--transition-fast)',
            }}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={isFavorited ? 'var(--color-primary)' : 'none'} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (onQuickView) onQuickView(cake);
            }}
            style={{
              inlineSize: '34px',
              blockSize: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              display: 'grid',
              placeContent: 'center',
              color: 'var(--color-text-main)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
            aria-label="Quick preview cake details"
            title="Quick View Details"
          >
            <Eye size={17} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Rating & Flavor */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBlockEnd: '6px',
              fontSize: '0.78rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-star)', fontWeight: 700 }}>
              <Star size={14} fill="var(--color-star)" />
              <span>{cake.rating}</span>
              <span style={{ color: 'var(--color-text-light)', fontWeight: 500 }}>
                ({cake.reviewsCount})
              </span>
            </div>

            <span style={{ color: 'var(--color-text-light)', fontSize: '0.75rem' }}>
              {currentWeightObj.serves}
            </span>
          </div>

          {/* Title as Link to /cake/:id */}
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              marginBlockEnd: '4px',
              lineHeight: 1.3,
            }}
          >
            <Link
              to={`/cake/${cake.id}`}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              {cake.name}
            </Link>
          </h3>

          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              marginBlockEnd: '14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'clip',
              lineHeight: 1.45,
            }}
          >
            {cake.tagline}
          </p>

          {/* Weight Selector Pills */}
          <div style={{ marginBlockEnd: '14px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                marginBlockEnd: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Select Weight:
            </div>
            <div
              style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
              }}
            >
              {cake.weights.map((w, idx) => (
                <button
                  key={w.weight}
                  onClick={() => setSelectedWeightIndex(idx)}
                  style={{
                    paddingInline: '10px',
                    paddingBlock: '5px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: selectedWeightIndex === idx
                      ? '1.5px solid var(--color-primary)'
                      : '1px solid var(--color-border)',
                    backgroundColor: selectedWeightIndex === idx
                      ? 'var(--color-primary-light)'
                      : 'var(--color-surface-subtle)',
                    color: selectedWeightIndex === idx
                      ? 'var(--color-primary)'
                      : 'var(--color-text-main)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {w.weight}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Cake Message Toggle */}
          <div style={{ marginBlockEnd: '14px' }}>
            {!showMessageInput ? (
              <button
                onClick={() => setShowMessageInput(true)}
                style={{
                  fontSize: '0.76rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                }}
              >
                + Add text to pipe on cake (Free)
              </button>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '4px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    Piping text on cake:
                  </label>
                  <button
                    onClick={() => {
                      setCakeMessage('');
                      setShowMessageInput(false);
                    }}
                    style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}
                  >
                    Cancel
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="e.g. Happy 25th Diksha! ❤️"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  style={{
                    inlineSize: '100%',
                    paddingInline: '10px',
                    paddingBlock: '6px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Price & Add to Cart footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBlockStart: '12px',
            borderTop: '1px solid var(--color-border)',
            gap: '8px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
              Total Price
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
              }}
            >
              ₹{currentPrice}
            </div>
          </div>

          {/* In-cart quantity controller or Add to Cart button */}
          {inCartQty > 0 ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-full)',
                paddingInline: '8px',
                paddingBlock: '5px',
                border: '1px solid var(--color-primary)',
              }}
            >
              <button
                onClick={() => updateQuantity(cartItem.cartId, -1)}
                style={{
                  color: 'var(--color-primary)',
                  display: 'grid',
                  placeContent: 'center',
                  inlineSize: '24px',
                  blockSize: '24px',
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-primary)', minInlineSize: '18px', textAlign: 'center' }}>
                {inCartQty}
              </span>

              <button
                onClick={() => updateQuantity(cartItem.cartId, 1)}
                style={{
                  color: 'var(--color-primary)',
                  display: 'grid',
                  placeContent: 'center',
                  inlineSize: '24px',
                  blockSize: '24px',
                }}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                paddingInline: '14px',
                paddingBlock: '8px',
                fontSize: '0.84rem',
              }}
            >
              <ShoppingBag size={15} />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
