import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CAKES } from '../data/cakes';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export default function WishlistPage({ onShowToast }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const favoritedCakes = CAKES.filter(c => wishlist.includes(c.id));

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ marginBlockEnd: '28px' }}>
          <Link
            to="/cakes"
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
            <span>Back to Cake Menu</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={28} color="var(--color-primary)" fill="var(--color-primary)" />
            <h1 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)', fontWeight: 800 }}>
              Your Saved Favorites ({favoritedCakes.length})
            </h1>
          </div>
        </div>

        {favoritedCakes.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '60px 24px',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBlockEnd: '12px' }}>💖</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              Your wishlist is currently empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBlockEnd: '24px' }}>
              Tap the heart icon on any cake to save it here for upcoming birthdays and anniversaries!
            </p>
            <Link to="/cakes" className="btn-primary" style={{ paddingInline: '24px', paddingBlock: '12px' }}>
              Explore Cakes
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {favoritedCakes.map(cake => (
              <div
                key={cake.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-sm)',
                  flexWrap: 'wrap',
                }}
              >
                <Link to={`/cake/${cake.id}`}>
                  <img
                    src={cake.image}
                    alt={cake.name}
                    style={{
                      inlineSize: '80px',
                      blockSize: '80px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                    }}
                  />
                </Link>

                <div style={{ flex: 1, minWidth: '200px' }}>
                  <Link to={`/cake/${cake.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBlockEnd: '4px' }}>
                      {cake.name}
                    </h3>
                  </Link>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBlockEnd: '4px' }}>
                    {cake.flavor}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    Starting at ₹{cake.basePrice}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={() => {
                      addToCart({
                        id: cake.id,
                        name: cake.name,
                        image: cake.image,
                        weight: cake.baseWeight,
                        price: cake.basePrice,
                        isEggless: cake.isEggless,
                        quantity: 1,
                      });
                      onShowToast?.(`Added "${cake.name}" to cart! 🍰`, 'success');
                    }}
                    className="btn-primary"
                    style={{ paddingInline: '16px', paddingBlock: '8px', fontSize: '0.85rem' }}
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(cake.id)}
                    style={{ color: 'var(--color-text-light)', padding: '8px' }}
                    title="Remove from favorites"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
