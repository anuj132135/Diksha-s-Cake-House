import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Clock, CheckCircle2, Phone, Truck, ChefHat, Sparkles } from 'lucide-react';

const TRACKING_STEPS = [
  { step: 1, title: 'Order Confirmed', desc: 'Baking ingredients & Belgian cocoa measured', icon: '📝' },
  { step: 2, title: 'Baking in Oven', desc: 'Golden sponge baking in dedicated oven at 175°C', icon: '🔥' },
  { step: 3, title: 'Chef Icing & Piping', desc: 'Artisan lettering & custom decoration applied', icon: '🎂' },
  { step: 4, title: 'Gift Packaging', desc: 'Complimentary knife, candles & chiller box sealed', icon: '🎁' },
  { step: 5, title: 'Out for Express Delivery', desc: 'Rider carrying in air-conditioned pastry bag', icon: '🛵' },
  { step: 6, title: 'Delivered & Celebrated', desc: 'Arrived ready to celebrate', icon: '🎉' },
];

export default function TrackerPage() {
  const { activeOrder } = useCart();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState(activeOrder);

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeOrder && activeOrder.orderId.toLowerCase().includes(searchOrderId.trim().toLowerCase())) {
      setCurrentOrder(activeOrder);
    } else {
      // Demo mock order
      setCurrentOrder({
        orderId: searchOrderId.toUpperCase() || 'DKB-78219',
        customerName: 'Aarav Sharma',
        phone: '+91 85650 98470',
        address: 'Plot No. 37, Near Shikha Jewellers, Gopal Nagar',
        slot: 'Evening (4:00 PM - 8:00 PM)',
        status: 'decorating',
        statusStep: 3,
        estimatedTime: '35 mins remaining',
        riderName: 'Vikram Singh',
        riderPhone: '+91 99887 76655',
        placedAt: '16:30 PM',
        items: [{ name: 'Diksha Royal Belgian Truffle', weight: '1.0 kg', price: 1299, quantity: 1, message: 'Happy Birthday Diksha! ❤️' }],
        totalAmount: 1299,
      });
    }
  };

  const activeStep = currentOrder ? currentOrder.statusStep || 3 : 3;

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
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
              paddingInline: '14px',
              paddingBlock: '4px',
              borderRadius: 'var(--radius-full)',
              marginBlockEnd: '10px',
            }}
          >
            <Truck size={16} />
            <span>Oven to Doorstep Live Radar</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, marginBlockEnd: '8px' }}>
            Track Your Bakery Order
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem' }}>
            Watch your celebration cake progress from oven baking to temperature-controlled transit.
          </p>
        </div>

        {/* Search Input Box */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBlockEnd: '28px',
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter your Order ID (e.g. DKB-78219)"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-main)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ paddingInline: '22px', fontSize: '0.92rem' }}
            >
              <Search size={18} />
              <span>Track Now</span>
            </button>
          </form>
        </div>

        {/* Order Details & Progress View */}
        {currentOrder && (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Overview strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                paddingBlockEnd: '20px',
                borderBottom: '1px solid var(--color-border)',
                marginBlockEnd: '28px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Tracking Order:
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  #{currentOrder.orderId}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Slot: <strong>{currentOrder.slot}</strong>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  paddingInline: '16px',
                  paddingBlock: '8px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Clock size={18} />
                <span>Estimated Arrival: {currentOrder.estimatedTime}</span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBlockEnd: '32px' }}>
              {TRACKING_STEPS.map((s, idx) => {
                const isDone = s.step < activeStep;
                const isCurrent = s.step === activeStep;

                return (
                  <div key={s.step} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                    {/* Connecting Line */}
                    {idx < TRACKING_STEPS.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          insetInlineStart: '20px',
                          insetBlockStart: '40px',
                          inlineSize: '2px',
                          blockSize: '32px',
                          backgroundColor: isDone ? 'var(--color-veg)' : 'var(--color-border)',
                        }}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      style={{
                        inlineSize: '42px',
                        blockSize: '42px',
                        borderRadius: '50%',
                        backgroundColor: isDone
                          ? 'var(--color-veg)'
                          : isCurrent
                          ? 'var(--color-primary)'
                          : 'var(--color-surface-subtle)',
                        color: isDone || isCurrent ? '#FFF' : 'var(--color-text-light)',
                        border: `2px solid ${isDone ? 'var(--color-veg)' : isCurrent ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        display: 'grid',
                        placeContent: 'center',
                        fontSize: '1.1rem',
                        flexShrink: 0,
                        zIndex: 1,
                        boxShadow: isCurrent ? '0 0 0 6px var(--color-primary-glow)' : 'none',
                      }}
                    >
                      {isDone ? '✓' : s.icon}
                    </div>

                    {/* Step Info */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: isCurrent ? 800 : 600,
                          color: isCurrent
                            ? 'var(--color-primary)'
                            : isDone
                            ? 'var(--color-text-main)'
                            : 'var(--color-text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span>{s.title}</span>
                        {isCurrent && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              backgroundColor: 'var(--color-primary-light)',
                              color: 'var(--color-primary)',
                              paddingInline: '8px',
                              paddingBlock: '2px',
                              borderRadius: 'var(--radius-full)',
                            }}
                          >
                            CURRENT STAGE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {s.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rider & Delivery Contact Box */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    inlineSize: '46px',
                    blockSize: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary-light)',
                    display: 'grid',
                    placeContent: 'center',
                    fontSize: '1.4rem',
                  }}
                >
                  🛵
                </div>
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700 }}>
                    Delivery Rider: {currentOrder.riderName || 'Vikram Singh'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Temperature-controlled cake delivery • OTP verification
                  </div>
                </div>
              </div>

              <a
                href={`tel:${currentOrder.riderPhone || '+919988776655'}`}
                className="btn-primary"
                style={{
                  backgroundColor: 'var(--color-veg)',
                  paddingInline: '18px',
                  paddingBlock: '10px',
                  fontSize: '0.86rem',
                }}
              >
                <Phone size={15} />
                <span>Call Rider ({currentOrder.riderPhone})</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
