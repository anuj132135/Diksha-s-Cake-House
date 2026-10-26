import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';

const SPONGES = [
  { id: 'belgian-choco', name: 'Belgian Dark Chocolate', price: 0, color: '#3E2723' },
  { id: 'red-velvet', name: 'Scarlet Red Velvet', price: 50, color: '#881337' },
  { id: 'vanilla-bean', name: 'Madagascar Vanilla Bean', price: 0, color: '#FEF3C7' },
  { id: 'butterscotch', name: 'Caramel Butterscotch', price: 40, color: '#D97706' },
  { id: 'pistachio', name: 'Iranian Pistachio Rose', price: 100, color: '#4D7C0F' },
];

const FROSTINGS = [
  { id: 'ivory-cream', name: 'Ivory Whipped Cream', color: '#FFFBEB', textColor: '#333' },
  { id: 'rose-pink', name: 'Pastel Rose Blossom', color: '#FBCFE8', textColor: '#831843' },
  { id: 'dark-ganache', name: 'Belgian Dark Ganache', color: '#27170F', textColor: '#FFF' },
  { id: 'sky-blue', name: 'Enchanted Sky Blue', color: '#BAE6FD', textColor: '#0369A1' },
  { id: 'lavender', name: 'Velvet Lavender', color: '#DDD6FE', textColor: '#5B21B6' },
];

const DRIPS = [
  { id: 'none', name: 'Clean Edge (No Drip)', price: 0, color: 'transparent' },
  { id: 'choco-drip', name: 'Belgian Choco Drip', price: 49, color: '#3D2214' },
  { id: 'caramel-drip', name: 'Salted Caramel Drip', price: 49, color: '#B45309' },
  { id: 'berry-drip', name: 'Wild Berry Drip', price: 49, color: '#9F1239' },
];

const TOPPINGS = [
  { id: 'macarons', name: 'French Macarons (3 Pcs)', price: 120, icon: '🍬' },
  { id: 'gold-leaf', name: 'Edible 24K Gold Leaf', price: 150, icon: '✨' },
  { id: 'ferrero', name: 'Ferrero Rocher Truffles (3 Pcs)', price: 140, icon: '🍫' },
  { id: 'strawberries', name: 'Fresh Glazed Strawberries', price: 99, icon: '🍓' },
  { id: 'acrylic-topper', name: 'Gold Acrylic "Happy Birthday"', price: 69, icon: '👑' },
  { id: 'sparkler', name: 'Magic Sparkler Candle', price: 49, icon: '🕯️' },
];

const TIERS = [
  { id: 1, name: 'Single Tier (1.0 kg)', basePrice: 999, serves: '8-10 guests' },
  { id: 2, name: '2-Tier Classic (2.0 kg)', basePrice: 1999, serves: '18-20 guests' },
  { id: 3, name: '3-Tier Royal Grand (3.5 kg)', basePrice: 3499, serves: '30-35 guests' },
];

export default function CakeStudio({ onClose, onShowToast }) {
  const { addToCart } = useCart();

  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [selectedSponge, setSelectedSponge] = useState(SPONGES[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedDrip, setSelectedDrip] = useState(DRIPS[1]);
  const [selectedToppings, setSelectedToppings] = useState(['gold-leaf', 'macarons']);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday Diksha!');

  const toggleTopping = (toppingId) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId) ? prev.filter(id => id !== toppingId) : [...prev, toppingId]
    );
  };

  const toppingsTotal = selectedToppings.reduce((sum, tid) => {
    const item = TOPPINGS.find(t => t.id === tid);
    return sum + (item ? item.price : 0);
  }, 0);

  const calculatedTotal =
    selectedTier.basePrice +
    selectedSponge.price +
    selectedDrip.price +
    toppingsTotal;

  const handleAddCustomCake = () => {
    addToCart({
      id: `custom-cake-${Date.now()}`,
      name: `Custom ${selectedTier.name.split(' (')[0]} - ${selectedSponge.name}`,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      weight: selectedTier.name.match(/\((.*?)\)/)?.[1] || '1.0 kg',
      price: calculatedTotal,
      isEggless: true,
      cakeMessage: cakeMessage.trim(),
      isCustom: true,
      customSpecs: {
        tier: selectedTier.name,
        sponge: selectedSponge.name,
        frosting: selectedFrosting.name,
        drip: selectedDrip.name,
        toppings: selectedToppings.map(tid => TOPPINGS.find(t => t.id === tid)?.name).filter(Boolean),
      },
      quantity: 1,
    });

    onShowToast?.('Your custom dream cake was added to the cart! 🎂✨', 'success');
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 'clamp(16px, 3vw, 28px)',
        alignItems: 'start',
      }}
    >
      {/* Visual Live Cake Simulator (Left Column) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'var(--color-surface-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(16px, 3vw, 24px)',
          border: '1px solid var(--color-border)',
        }}
        className="studio-preview-box"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBlockEnd: '14px' }}>
          <Sparkles size={18} color="var(--color-secondary)" />
          <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
            Live Interactive Cake Preview
          </span>
        </div>

        {/* 2D Layered Vector Cake graphic */}
        <div
          style={{
            position: 'relative',
            inlineSize: '100%',
            maxInlineSize: '290px',
            blockSize: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: '16px',
          }}
        >
          {/* Acrylic Topper Preview */}
          {selectedToppings.includes('acrylic-topper') && (
            <div
              style={{
                fontSize: '0.92rem',
                fontWeight: 800,
                color: '#D4AF37',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                marginBlockEnd: '4px',
                animation: 'floatCake 3s ease-in-out infinite',
              }}
            >
              👑 Happy Birthday
            </div>
          )}

          {/* Sparkler candle if chosen */}
          {selectedToppings.includes('sparkler') && (
            <div style={{ fontSize: '1.2rem', marginBlockEnd: '-6px', zIndex: 10 }}>
              🕯️✨
            </div>
          )}

          {/* Tier 3 (Top tier if 3 tiers) */}
          {selectedTier.id >= 3 && (
            <div
              style={{
                inlineSize: '110px',
                blockSize: '40px',
                borderRadius: '8px 8px 0 0',
                backgroundColor: selectedFrosting.color,
                border: '2px solid rgba(0,0,0,0.08)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease',
              }}
            >
              {selectedDrip.color !== 'transparent' && (
                <div
                  style={{
                    position: 'absolute',
                    insetBlockStart: 0,
                    inlineSize: '100%',
                    blockSize: '8px',
                    backgroundColor: selectedDrip.color,
                    borderRadius: '6px 6px 0 0',
                  }}
                />
              )}
            </div>
          )}

          {/* Tier 2 (Middle tier if 2 or 3 tiers) */}
          {selectedTier.id >= 2 && (
            <div
              style={{
                inlineSize: selectedTier.id === 2 ? '140px' : '160px',
                blockSize: '48px',
                borderRadius: '10px 10px 0 0',
                backgroundColor: selectedFrosting.color,
                border: '2px solid rgba(0,0,0,0.08)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease',
              }}
            >
              {selectedDrip.color !== 'transparent' && (
                <div
                  style={{
                    position: 'absolute',
                    insetBlockStart: 0,
                    inlineSize: '100%',
                    blockSize: '9px',
                    backgroundColor: selectedDrip.color,
                    borderRadius: '8px 8px 0 0',
                  }}
                />
              )}
            </div>
          )}

          {/* Base Tier (Tier 1) */}
          <div
            style={{
              inlineSize: selectedTier.id === 1 ? '190px' : '210px',
              blockSize: selectedTier.id === 1 ? '95px' : '58px',
              borderRadius: '12px 12px 4px 4px',
              backgroundColor: selectedFrosting.color,
              border: '2px solid rgba(0,0,0,0.08)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              transition: 'background-color 0.3s ease',
            }}
          >
            {/* Drip on top of tier */}
            {selectedDrip.color !== 'transparent' && (
              <div
                style={{
                  position: 'absolute',
                  insetBlockStart: 0,
                  inlineSize: '100%',
                  blockSize: '12px',
                  backgroundColor: selectedDrip.color,
                  borderRadius: '10px 10px 0 0',
                }}
              />
            )}

            {/* Inscribed Piping Text on Cake */}
            {cakeMessage && (
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: selectedFrosting.textColor,
                  textAlign: 'center',
                  paddingInline: '8px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                  zIndex: 4,
                  wordBreak: 'break-word',
                  maxWidth: '92%',
                }}
              >
                "{cakeMessage}"
              </div>
            )}

            {/* Topping Accents Icons */}
            <div
              style={{
                position: 'absolute',
                insetBlockEnd: '4px',
                display: 'flex',
                gap: '6px',
                fontSize: '0.9rem',
              }}
            >
              {selectedToppings.includes('macarons') && <span>🍬</span>}
              {selectedToppings.includes('ferrero') && <span>🍫</span>}
              {selectedToppings.includes('strawberries') && <span>🍓</span>}
              {selectedToppings.includes('gold-leaf') && <span>✨</span>}
            </div>
          </div>

          {/* Golden Stand */}
          <div
            style={{
              inlineSize: '230px',
              blockSize: '10px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(90deg, #D4AF37, #FDF6E2, #AA771C)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              zIndex: 0,
            }}
          />
        </div>

        {/* Dynamic Specs Summary */}
        <div
          style={{
            inlineSize: '100%',
            backgroundColor: 'var(--color-surface)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: '0.78rem',
            lineHeight: 1.6,
            marginBlockStart: '10px',
          }}
        >
          <div><strong>Size:</strong> {selectedTier.name}</div>
          <div><strong>Flavor:</strong> {selectedSponge.name}</div>
          <div><strong>Frosting:</strong> {selectedFrosting.name}</div>
          <div><strong>Accents:</strong> {selectedToppings.length > 0 ? selectedToppings.map(id => TOPPINGS.find(t => t.id === id)?.name).join(', ') : 'None'}</div>
        </div>

        {/* Total & Add button */}
        <div
          style={{
            inlineSize: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBlockStart: '14px',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Estimated Price</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₹{calculatedTotal}
            </div>
          </div>

          <button
            onClick={handleAddCustomCake}
            className="btn-primary"
            style={{ paddingInline: '18px', paddingBlock: '10px', fontSize: '0.88rem' }}
          >
            <ShoppingBag size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Customization Options Controls (Right Column) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Step 1: Tier Selection */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '8px', display: 'block' }}>
            1. Select Size & Tiers:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))', gap: '8px' }}>
            {TIERS.map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedTier.id === tier.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: selectedTier.id === tier.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: selectedTier.id === tier.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                  textAlign: 'left',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div>{tier.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                  {tier.serves}
                </div>
                <div style={{ fontWeight: 700, marginBlockStart: '4px' }}>₹{tier.basePrice}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Sponge Flavor */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '8px', display: 'block' }}>
            2. Choose Sponge Flavor:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
            {SPONGES.map(sponge => (
              <button
                key={sponge.id}
                onClick={() => setSelectedSponge(sponge)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedSponge.id === sponge.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: selectedSponge.id === sponge.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    inlineSize: '15px',
                    blockSize: '15px',
                    borderRadius: '50%',
                    backgroundColor: sponge.color,
                    border: '1px solid rgba(0,0,0,0.2)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1 }}>{sponge.name}</span>
                {sponge.price > 0 && <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)' }}>+₹{sponge.price}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Frosting Palette */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '8px', display: 'block' }}>
            3. Choose Frosting Color:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
            {FROSTINGS.map(frosting => (
              <button
                key={frosting.id}
                onClick={() => setSelectedFrosting(frosting)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedFrosting.id === frosting.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: selectedFrosting.id === frosting.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    inlineSize: '15px',
                    blockSize: '15px',
                    borderRadius: '50%',
                    backgroundColor: frosting.color,
                    border: '1px solid rgba(0,0,0,0.2)',
                    flexShrink: 0,
                  }}
                />
                <span>{frosting.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Drip Style */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '8px', display: 'block' }}>
            4. Artisanal Drip Glaze:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
            {DRIPS.map(drip => (
              <button
                key={drip.id}
                onClick={() => setSelectedDrip(drip)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedDrip.id === drip.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: selectedDrip.id === drip.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                <div>{drip.name}</div>
                {drip.price > 0 && <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)' }}>+₹{drip.price}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Toppings */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '8px', display: 'block' }}>
            5. Luxury Toppings (Select multiple):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {TOPPINGS.map(top => {
              const active = selectedToppings.includes(top.id);
              return (
                <button
                  key={top.id}
                  onClick={() => toggleTopping(top.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    backgroundColor: active ? 'var(--color-primary-light)' : 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{top.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div>{top.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)' }}>+₹{top.price}</div>
                  </div>
                  {active && <Check size={14} color="var(--color-primary)" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 6: Custom Message */}
        <div>
          <label style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '6px', display: 'block' }}>
            6. Message on Cake (Real-time Piped Preview):
          </label>
          <input
            type="text"
            maxLength={35}
            value={cakeMessage}
            onChange={(e) => setCakeMessage(e.target.value)}
            placeholder="e.g. Happy 25th Birthday Diksha! ❤️"
            style={{
              inlineSize: '100%',
              paddingInline: '14px',
              paddingBlock: '10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-main)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .studio-preview-box {
            position: sticky;
            top: 100px;
          }
        }
      `}</style>
    </div>
  );
}
