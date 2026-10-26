import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ShieldCheck, ArrowRight, Star, Heart, PhoneCall } from 'lucide-react';

export default function Hero({ onExploreCatalog }) {
  return (
    <section
      style={{
        position: 'relative',
        paddingBlock: 'clamp(2.5rem, 5.5vw, 4.8rem)',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(229, 115, 133, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(70, 32, 23, 0.08) 0%, transparent 50%)',
        overflow: 'clip',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 4.5vw, 3.8rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Headlines & CTA */}
          <div>
            {/* Live Oven Batch Badge with Inline Heart */}
            <div
              className="hero-trust-badge"
              style={{
                display: 'inline-block',
                paddingInline: '14px',
                paddingBlock: '6px',
                backgroundColor: 'var(--color-rose-light)',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--color-rose)',
                marginBlockEnd: '16px',
                border: '1px solid var(--color-border-rose)',
                maxWidth: '100%',
                lineHeight: 1.45,
              }}
            >
              <Heart
                size={14}
                fill="var(--color-rose)"
                style={{
                  display: 'inline-block',
                  verticalAlign: '-2px',
                  marginInlineEnd: '6px',
                  flexShrink: 0,
                }}
              />
              <span>Freshly Baked ♥ Made with Love • 100% Eggless Certified</span>
            </div>

            {/* Headline with Brand Display Font */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.16,
                marginBlockEnd: '18px',
                color: 'var(--color-chocolate)',
              }}
            >
              Handcrafted Celebrations at{' '}
              <span style={{ color: 'var(--color-rose)' }}>Diksha's</span>{' '}
              <span style={{ color: 'var(--color-chocolate)' }}>Cake House</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.65,
                marginBlockEnd: '26px',
                maxWidth: '540px',
              }}
            >
              Every cake is baked fresh from scratch with rich premium chocolate, farm-fresh dairy cream, and zero preservatives. Delivered to your doorstep in <strong>2 hours</strong> or at the stroke of <strong>midnight</strong>.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-cta-buttons"
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                marginBlockEnd: '32px',
              }}
            >
              <button
                onClick={onExploreCatalog}
                className="btn-primary"
                style={{
                  fontSize: '0.98rem',
                  paddingInline: '24px',
                  paddingBlock: '12px',
                  flex: '1 1 auto',
                  maxWidth: '280px',
                }}
              >
                <span>Explore Cake Menu</span>
                <ArrowRight size={18} />
              </button>

              <Link
                to="/contact"
                className="btn-rose"
                style={{
                  fontSize: '0.98rem',
                  paddingInline: '22px',
                  paddingBlock: '12px',
                  flex: '1 1 auto',
                  maxWidth: '280px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <PhoneCall size={18} />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Feature Highlights Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                paddingBlockStart: '18px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--color-chocolate)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>2-Hr Express Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--color-veg)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>100% Eggless Certified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--color-rose)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Freshly Baked Daily</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cake Showcase Banner with Logo Emblem */}
          <div style={{ position: 'relative', inlineSize: '100%' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'clip',
                boxShadow: 'var(--shadow-lg)',
                aspectRatio: '4 / 3.4',
                backgroundColor: 'var(--color-surface-subtle)',
                inlineSize: '100%',
                border: '2px solid var(--color-border)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                alt="Diksha's Royal Belgian Truffle Cake"
                style={{
                  inlineSize: '100%',
                  blockSize: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(45, 18, 12, 0.88) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(14px, 3vw, 24px)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBlockEnd: '6px', flexWrap: 'wrap' }}>
                  <span className="veg-tag" style={{ backgroundColor: 'rgba(22, 163, 74, 0.95)', color: '#FFF' }}>
                    <span className="veg-symbol" style={{ borderColor: '#FFF' }} /> 100% Pure Veg
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(229, 115, 133, 0.95)',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      paddingInline: '8px',
                      paddingBlock: '3px',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Star size={12} fill="#FFF" /> 4.95 (380+ reviews)
                  </span>
                </div>
                <h3 style={{ color: '#FFF', fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', marginBlockEnd: '4px' }}>
                  Diksha's Royal Belgian Truffle
                </h3>
                <p style={{ fontSize: '0.82rem', opacity: 0.9, color: '#FAF5EE' }}>
                  Freshly Baked ♥ Made with Love • Starting at ₹699
                </p>
              </div>

              {/* Floating Circular Brand Logo Stamp */}
              <div
                className="floating-anim"
                style={{
                  position: 'absolute',
                  insetBlockStart: '14px',
                  insetInlineEnd: '14px',
                  inlineSize: '62px',
                  blockSize: '62px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--color-chocolate)',
                  padding: '2px',
                  backgroundColor: '#FAF5EE',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src="/logo.png"
                  alt="Diksha's Cake House"
                  style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
            </div>

            {/* Badges container */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                marginBlockStart: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-main)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: '1 1 180px',
                }}
              >
                <div
                  style={{
                    inlineSize: '34px',
                    blockSize: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E57385, #462017)',
                    display: 'grid',
                    placeContent: 'center',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}
                >
                  ♥
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>50,000+ Celebrations</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Loved across Delhi NCR
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: '1 1 180px',
                }}
              >
                <div style={{ fontSize: '1.4rem' }}>🌙</div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-rose)' }}>
                    Midnight Surprise Delivery
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    11:30 PM - 12:00 AM slot
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
