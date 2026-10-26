import React, { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useDialogFallback } from '../hooks/useDialogFallback';
import { X, Search, Clock, CheckCircle2, Phone, MapPin, Truck, ChefHat, Sparkles } from 'lucide-react';

const TRACKING_STEPS = [
  { step: 1, title: 'Order Confirmed', desc: 'Baking ingredients & Belgian cocoa measured', icon: '📝' },
  { step: 2, title: 'Baking in Oven', desc: 'Golden sponge baking in dedicated oven at 175°C', icon: '🔥' },
  { step: 3, title: 'Chef Icing & Piping', desc: 'Artisan lettering & custom decoration applied', icon: '🎂' },
  { step: 4, title: 'Gift Packaging', desc: 'Complimentary knife, candles & chiller box sealed', icon: '🎁' },
  { step: 5, title: 'Out for Express Delivery', desc: 'Rider carrying in air-conditioned pastry bag', icon: '🛵' },
  { step: 6, title: 'Delivered & Celebrated', desc: 'Arrived ready to celebrate', icon: '🎉' },
];

export default function OrderTracker({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  useDialogFallback(dialogRef, isOpen, onClose);

  const { activeOrder } = useCart();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState(activeOrder);

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeOrder && activeOrder.orderId.toLowerCase().includes(searchOrderId.trim().toLowerCase())) {
      setCurrentOrder(activeOrder);
    } else {
      // Demo fallback mock order
      setCurrentOrder({
        orderId: searchOrderId.toUpperCase() || 'DKB-99120',
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
        items: [{ name: 'Diksha Royal Belgian Truffle', weight: '1.0 kg', price: 1299, quantity: 1 }],
        totalAmount: 1299,
      });
    }
  };

  const activeStep = currentOrder ? currentOrder.statusStep || 3 : 3;

  return (
    <dialog
      ref={dialogRef}
      id="orderTrackerDialog"
      closedby="any"
      aria-labelledby="trackerTitle"
      style={{
        width: 'min(94vw, 650px)',
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
            <div
              style={{
                inlineSize: '36px',
                blockSize: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'grid',
                placeContent: 'center',
              }}
            >
              <Truck size={20} />
            </div>
            <div>
              <h2 id="trackerTitle" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Live Cake Tracker
              </h2>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                Track your cake live from Diksha's oven to your doorstep
              </div>
            </div>
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
            aria-label="Close tracker"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Order Search Box */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBlockEnd: '20px' }}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. DKB-78219)"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              style={{
                flex: 1,
                paddingInline: '14px',
                paddingBlock: '10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-main)',
                fontSize: '0.86rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ paddingInline: '16px', paddingBlock: '10px', fontSize: '0.86rem' }}
            >
              <Search size={16} />
              <span>Track</span>
            </button>
          </form>

          {currentOrder && (
            <div>
              {/* Order Overview Banner */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  border: '1px solid var(--color-border)',
                  marginBlockEnd: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Active Order
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    #{currentOrder.orderId}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Slot: {currentOrder.slot}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    paddingInline: '12px',
                    paddingBlock: '6px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Clock size={16} />
                  <span>ETA: {currentOrder.estimatedTime || '35 mins'}</span>
                </div>
              </div>

              {/* Step Progress Timeline */}
              <div style={{ position: 'relative', marginBlockEnd: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                    position: 'relative',
                  }}
                >
                  {TRACKING_STEPS.map((s, idx) => {
                    const isDone = s.step < activeStep;
                    const isCurrent = s.step === activeStep;

                    return (
                      <div
                        key={s.step}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '14px',
                          position: 'relative',
                        }}
                      >
                        {/* Connecting Line */}
                        {idx < TRACKING_STEPS.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              insetInlineStart: '18px',
                              insetBlockStart: '34px',
                              inlineSize: '2px',
                              blockSize: '26px',
                              backgroundColor: isDone ? 'var(--color-veg)' : 'var(--color-border)',
                              zIndex: 0,
                            }}
                          />
                        )}

                        {/* Step Icon Badge */}
                        <div
                          style={{
                            inlineSize: '38px',
                            blockSize: '38px',
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
                            fontSize: '1rem',
                            flexShrink: 0,
                            zIndex: 1,
                            boxShadow: isCurrent ? '0 0 0 4px var(--color-primary-glow)' : 'none',
                          }}
                        >
                          {isDone ? '✓' : s.icon}
                        </div>

                        {/* Step Description */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: '0.92rem',
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
                                  fontSize: '0.68rem',
                                  backgroundColor: 'var(--color-primary-light)',
                                  color: 'var(--color-primary)',
                                  paddingInline: '6px',
                                  paddingBlock: '2px',
                                  borderRadius: 'var(--radius-full)',
                                }}
                              >
                                IN PROGRESS
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Rider & Contact Box */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      inlineSize: '42px',
                      blockSize: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-secondary-light)',
                      display: 'grid',
                      placeContent: 'center',
                      fontSize: '1.2rem',
                    }}
                  >
                    🛵
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                      Rider: {currentOrder.riderName || 'Vikram Singh'}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                      Contact: {currentOrder.riderPhone || '+91 99887 76655'}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${currentOrder.riderPhone || '+919988776655'}`}
                  className="btn-primary"
                  style={{
                    paddingInline: '14px',
                    paddingBlock: '8px',
                    fontSize: '0.82rem',
                    backgroundColor: 'var(--color-veg)',
                  }}
                >
                  <Phone size={14} />
                  <span>Call Rider</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
