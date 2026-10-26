import React, { useRef } from 'react';
import { useCart } from '../context/CartContext';
import { CAKES } from '../data/cakes';
import { useDialogFallback } from '../hooks/useDialogFallback';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal({ isOpen, onClose, onShowToast, onOpenQuickView }) {
  const dialogRef = useRef(null);
  useDialogFallback(dialogRef, isOpen, onClose);

  const { wishlist, toggleWishlist, addToCart } = useCart();

  const favoritedCakes = CAKES.filter(c => wishlist.includes(c.id));

  return (
    <dialog
      ref={dialogRef}
      id="wishlistDialog"
      closedby="any"
      aria-labelledby="wishlistTitle"
      style={{
        width: 'min(92vw, 560px)',
        padding: 0,
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="var(--color-primary)" fill="var(--color-primary)" />
            <h2 id="wishlistTitle" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Your Favorite Bakery Delights ({favoritedCakes.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--color-text-muted)',
              display: 'grid',
              placeContent: 'center',
            }}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
          {favoritedCakes.length === 0 ? (
            <div style={{ textAlign: 'center', paddingBlock: '30px' }}>
              <div style={{ fontSize: '2.5rem', marginBlockEnd: '10px' }}>💖</div>
              <h3 style={{ fontSize: '1.1rem', marginBlockEnd: '6px' }}>No favorite cakes yet</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Tap the heart on any cake in the menu to save it for your next celebration!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {favoritedCakes.map(cake => (
                <div
                  key={cake.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                  }}
                >
                  <img
                    src={cake.image}
                    alt={cake.name}
                    style={{
                      inlineSize: '65px',
                      blockSize: '65px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBlockEnd: '2px' }}>
                      {cake.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Starting at ₹{cake.basePrice}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
                        onShowToast?.(`Added ${cake.name} to cart! 🍰`, 'success');
                      }}
                      className="btn-primary"
                      style={{ paddingInline: '12px', paddingBlock: '6px', fontSize: '0.78rem' }}
                    >
                      <ShoppingBag size={14} />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(cake.id)}
                      style={{ color: 'var(--color-text-light)', padding: '6px' }}
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
