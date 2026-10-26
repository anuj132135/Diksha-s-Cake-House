import React from 'react';
import { useCart } from '../context/CartContext';
import { CELEBRATION_COMBOS } from '../data/cakes';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

export default function SpecialCombos({ onShowToast }) {
  const { addToCart } = useCart();

  const handleAddCombo = (combo) => {
    addToCart({
      id: combo.id,
      name: combo.name,
      image: combo.image,
      weight: 'Complete Hamper Box',
      price: combo.price,
      isEggless: combo.isEggless,
      quantity: 1,
      isCombo: true,
    });

    onShowToast?.(`Added "${combo.name}" to cart! 🎁`, 'success');
  };

  return (
    <section id="combos" style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)', backgroundColor: 'var(--color-surface-subtle)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              backgroundColor: 'var(--color-primary-light)',
              paddingInline: '12px',
              paddingBlock: '4px',
              borderRadius: 'var(--radius-full)',
              marginBlockEnd: '10px',
            }}
          >
            <Sparkles size={14} />
            <span>Complete Party Solutions</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, marginBlockEnd: '8px' }}>
            Celebration Bundles & Hampers
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '600px', marginInline: 'auto' }}>
            Save up to 20% with our all-in-one celebration kits including gourmet cake, fresh Dutch flowers, sparklers, and handwritten calligraphy notes.
          </p>
        </div>

        {/* Combos Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px',
          }}
        >
          {CELEBRATION_COMBOS.map(combo => (
            <div
              key={combo.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
              }}
            >
              {/* Image banner */}
              <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'clip' }}>
                <img
                  src={combo.image}
                  alt={combo.name}
                  style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    insetBlockStart: '12px',
                    insetInlineEnd: '12px',
                    backgroundColor: 'var(--color-secondary)',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    paddingInline: '10px',
                    paddingBlock: '4px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {combo.discount}
                </span>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBlockEnd: '12px' }}>
                    {combo.name}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBlockEnd: '16px' }}>
                    <strong>Includes:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, marginBlockStart: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {combo.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check size={14} color="var(--color-veg)" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Add */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBlockStart: '14px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                      ₹{combo.originalPrice}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      ₹{combo.price}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="btn-primary"
                    style={{ paddingInline: '16px', paddingBlock: '10px', fontSize: '0.85rem' }}
                  >
                    <ShoppingBag size={16} />
                    <span>Get Hamper</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
