import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CAKES, ADDONS } from '../data/cakes';
import { useCart } from '../context/CartContext';
import CakeCard from '../components/CakeCard';
import {
  Star,
  Heart,
  ShieldCheck,
  Clock,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Check,
  Plus,
  Minus,
  MessageCircle,
  Share2
} from 'lucide-react';

export default function CakeDetailPage({ onShowToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist, cart, updateQuantity } = useCart();

  const cake = CAKES.find(c => c.id === id);

  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [cakeMessage, setCakeMessage] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!cake) {
    return (
      <div className="container" style={{ paddingBlock: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBlockEnd: '12px' }}>Cake Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBlockEnd: '24px' }}>
          We could not find the cake you are looking for. It might have been updated or sold out for today.
        </p>
        <Link to="/cakes" className="btn-primary">
          Back to Cake Menu
        </Link>
      </div>
    );
  }

  const currentWeightObj = cake.weights[selectedWeightIndex] || cake.weights[0];
  const currentPrice = currentWeightObj.price;
  const currentWeight = currentWeightObj.weight;

  const isFavorited = isInWishlist(cake.id);
  const cartItem = cart.find(i => i.id === cake.id && i.weight === currentWeight);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  // Toggle local addon
  const toggleLocalAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.some(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]
    );
  };

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

    // Also add selected add-ons if any
    selectedAddons.forEach(addon => {
      addToCart({
        id: `addon-${addon.id}`,
        name: addon.name,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
        weight: 'Celebration Accessory',
        price: addon.price,
        quantity: 1,
      });
    });

    onShowToast?.(`Added "${cake.name} (${currentWeight})" to cart! 🍰`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${cake.name} - Diksha's Cake House`,
        text: `Check out this delicious ${cake.name} from Diksha's Cake House!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast?.('Link copied to clipboard! Share with friends ❤️', 'info');
    }
  };

  const relatedCakes = CAKES.filter(c => c.id !== cake.id && c.category === cake.category).slice(0, 3);

  return (
    <div style={{ paddingBlock: 'clamp(2rem, 4vw, 3.5rem)' }}>
      <div className="container">
        {/* Breadcrumb / Back button */}
        <div style={{ marginBlockEnd: '20px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Previous Page</span>
          </button>
        </div>

        {/* Product Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 5vw, 3.5rem)',
            alignItems: 'start',
            marginBlockEnd: '60px',
          }}
        >
          {/* Left Column: Visual Showcase */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'clip',
                boxShadow: 'var(--shadow-md)',
                aspectRatio: '4 / 3.4',
                backgroundColor: 'var(--color-surface-subtle)',
              }}
            >
              <img
                src={cake.image}
                alt={cake.name}
                style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
              />

              {/* Badges */}
              <div
                style={{
                  position: 'absolute',
                  insetBlockStart: '16px',
                  insetInlineStart: '16px',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {cake.badge && (
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(217, 72, 92, 0.95)',
                      color: '#FFF',
                      paddingInline: '10px',
                      paddingBlock: '4px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {cake.badge}
                  </span>
                )}

                <span className="veg-tag" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                  <span className="veg-symbol" /> 100% Eggless Certified
                </span>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => {
                  toggleWishlist(cake.id);
                  onShowToast?.(
                    isFavorited
                      ? `Removed ${cake.name} from favorites`
                      : `Saved ${cake.name} to favorites ❤️`,
                    'info'
                  );
                }}
                style={{
                  position: 'absolute',
                  insetBlockStart: '16px',
                  insetInlineEnd: '16px',
                  inlineSize: '42px',
                  blockSize: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  display: 'grid',
                  placeContent: 'center',
                  color: isFavorited ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={isFavorited ? 'var(--color-primary)' : 'none'} />
              </button>
            </div>

            {/* Quality Badges Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBlockStart: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <Clock size={20} color="var(--color-primary)" style={{ marginInline: 'auto', marginBlockEnd: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>2-Hr Express</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Same Day Delivery</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <ShieldCheck size={20} color="var(--color-veg)" style={{ marginInline: 'auto', marginBlockEnd: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>Dedicated Oven</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>100% Vegetarian</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <Sparkles size={20} color="var(--color-secondary)" style={{ marginInline: 'auto', marginBlockEnd: '4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>Zero Chemical</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Pure Belgian Couverture</div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Customization */}
          <div>
            {/* Rating & Share */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-star)', fontWeight: 700 }}>
                <Star size={18} fill="var(--color-star)" />
                <span style={{ fontSize: '1rem' }}>{cake.rating}</span>
                <span style={{ color: 'var(--color-text-light)', fontSize: '0.86rem' }}>
                  ({cake.reviewsCount} customer reviews)
                </span>
              </div>

              <button
                onClick={handleShare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-muted)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-subtle)',
                }}
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>
            </div>

            {/* Title & Tagline */}
            <h1 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', fontWeight: 800, marginBlockEnd: '8px' }}>
              {cake.name}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--color-primary)', fontStyle: 'italic', marginBlockEnd: '14px' }}>
              {cake.tagline}
            </p>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBlockEnd: '20px' }}>
              {cake.description}
            </p>

            {/* Weight Selector */}
            <div style={{ marginBlockEnd: '20px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBlockEnd: '8px', textTransform: 'uppercase' }}>
                Choose Size / Weight:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {cake.weights.map((w, idx) => (
                  <button
                    key={w.weight}
                    onClick={() => setSelectedWeightIndex(idx)}
                    style={{
                      paddingInline: '14px',
                      paddingBlock: '8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      border: selectedWeightIndex === idx
                        ? '2px solid var(--color-primary)'
                        : '1px solid var(--color-border)',
                      backgroundColor: selectedWeightIndex === idx
                        ? 'var(--color-primary-light)'
                        : 'var(--color-surface)',
                      color: selectedWeightIndex === idx
                        ? 'var(--color-primary)'
                        : 'var(--color-text-main)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span>{w.weight}</span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                      ₹{w.price} ({w.serves})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Piping Message Input */}
            <div style={{ marginBlockEnd: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBlockEnd: '6px' }}>
                Free Custom Text on Cake:
              </label>
              <input
                type="text"
                maxLength={35}
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder="e.g. Happy Birthday Diksha! 🎂"
                style={{
                  inlineSize: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  color: 'var(--color-text-main)',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginBlockStart: '4px' }}>
                Hand-piped by Chef Diksha in cursive icing script
              </div>
            </div>

            {/* Quick Add-ons */}
            <div style={{ marginBlockEnd: '24px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBlockEnd: '8px' }}>
                Add Celebration Accessories:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {ADDONS.slice(0, 4).map(addon => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleLocalAddon(addon)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: isChecked ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: isChecked ? 'var(--color-primary-light)' : 'var(--color-surface-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.78rem',
                        textAlign: 'left',
                      }}
                    >
                      <span>{addon.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{addon.name}</div>
                        <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>+₹{addon.price}</div>
                      </div>
                      {isChecked && <Check size={14} color="var(--color-primary)" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBlockStart: '20px',
                borderTop: '1px solid var(--color-border)',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-light)' }}>
                  Total for {currentWeight}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
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
                    gap: '12px',
                    backgroundColor: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-full)',
                    paddingInline: '16px',
                    paddingBlock: '10px',
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

                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary)', minWidth: '24px', textAlign: 'center' }}>
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
                  style={{ paddingInline: '28px', paddingBlock: '14px', fontSize: '1rem' }}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients & Storage Info Box */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBlockEnd: '60px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBlockEnd: '14px' }}>
            Artisanal Kitchen Notes & Storage
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', fontSize: '0.86rem', lineHeight: 1.7 }}>
            <div>
              <strong>Pure Ingredients:</strong>
              <div style={{ color: 'var(--color-text-muted)' }}>
                {cake.ingredients ? cake.ingredients.join(', ') : 'Belgian Chocolate, Pure Butter, Cream'}
              </div>
            </div>

            <div>
              <strong>Allergen Declaration:</strong>
              <div style={{ color: 'var(--color-text-muted)' }}>
                {cake.allergens || 'Contains Dairy. 100% Vegetarian.'}
              </div>
            </div>

            <div>
              <strong>Storage Instructions:</strong>
              <div style={{ color: 'var(--color-text-muted)' }}>
                {cake.storage || 'Refrigerate at 4-8°C. Best enjoyed fresh within 48 hours.'}
              </div>
            </div>
          </div>
        </div>

        {/* Related Cakes Section */}
        {relatedCakes.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBlockEnd: '20px' }}>
              You May Also Love
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '24px',
              }}
            >
              {relatedCakes.map(rCake => (
                <CakeCard
                  key={rCake.id}
                  cake={rCake}
                  onShowToast={onShowToast}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
