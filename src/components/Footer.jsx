import React, { useState } from 'react';
import { Heart, Sparkles, Send, ShieldCheck, Clock, MapPin, Phone } from 'lucide-react';

export default function Footer({ onShowToast }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    onShowToast?.("Welcome to Diksha's Cake Club! Check your email for your 15% discount code 🎉", 'success');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingBlockStart: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBlockEnd: '2rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '36px',
            marginBlockEnd: '48px',
          }}
        >
          {/* Col 1: Brand with Logo */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBlockEnd: '14px' }}>
              <div
                style={{
                  inlineSize: '50px',
                  blockSize: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--color-chocolate)',
                  padding: '2px',
                  backgroundColor: '#FAF5EE',
                  boxShadow: '0 2px 8px rgba(70, 32, 23, 0.2)',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.png"
                  alt="Diksha's Cake House"
                  style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: 'var(--color-chocolate)',
                    lineHeight: 1.15,
                  }}
                >
                  Diksha's <span style={{ color: 'var(--color-rose)', fontWeight: 700 }}>Cake House</span>
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
                  Freshly Baked ♥ Made with Love
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBlockEnd: '18px' }}>
              Handcrafting artisanal, 100% vegetarian & eggless cakes using rich premium chocolate and pure dairy butter. Making celebrations unforgettable every day.
            </p>

            <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: 'var(--color-veg)', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Certified 100% Vegetarian Oven</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBlockEnd: '14px', color: 'var(--color-chocolate)' }}>
              Celebration Menu
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
              <li><a href="/cakes" style={{ transition: 'color 0.2s' }}>Belgian Chocolate Truffle</a></li>
              <li><a href="/cakes" style={{ transition: 'color 0.2s' }}>Scarlet Red Velvet Dream</a></li>
              <li><a href="/cakes" style={{ transition: 'color 0.2s' }}>Lotus Biscoff Cheesecakes</a></li>
              <li><a href="/gallery" style={{ transition: 'color 0.2s' }}>Celebration Cake Gallery 🎂</a></li>
              <li><a href="/combos" style={{ transition: 'color 0.2s' }}>Birthday & Anniversary Hampers</a></li>
              <li><a href="/cakes" style={{ transition: 'color 0.2s' }}>Pinata Hammer Smash Cakes</a></li>
            </ul>
          </div>

          {/* Col 3: Delivery & Assurance */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBlockEnd: '14px', color: 'var(--color-chocolate)' }}>
              Kitchen & Express Dispatch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <div>
                <strong style={{ color: 'var(--color-text-main)' }}>Express 2-Hour Delivery:</strong>
                <div>Same-day oven-fresh delivery across Delhi NCR</div>
              </div>

              <div>
                <strong style={{ color: 'var(--color-text-main)' }}>Midnight Surprises:</strong>
                <div>11:30 PM to 12:00 AM delivery slot</div>
              </div>

              <div>
                <strong style={{ color: 'var(--color-text-main)' }}>Bakery & Studio:</strong>
                <div>Plot No. 37, Near Shikha Jewellers, Gopal Nagar</div>
              </div>

              <div>
                <strong style={{ color: 'var(--color-text-main)' }}>Customer Care & WhatsApp:</strong>
                <div>
                  <a href="tel:+918565098470" style={{ color: 'inherit', textDecoration: 'underline' }}>+91 85650 98470</a> (8:00 AM - 11:45 PM)
                </div>
                <div style={{ marginTop: '4px' }}>
                  <a href="mailto:dagrahari415@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>dagrahari415@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBlockEnd: '14px', color: 'var(--color-chocolate)' }}>
              Join Diksha's Sweet Club
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBlockEnd: '12px' }}>
              Subscribe for secret weekend bakes and receive an instant <strong>15% OFF</strong> voucher on your first celebration cake.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  color: 'var(--color-text-main)',
                  outline: 'none',
                  fontSize: '0.84rem',
                }}
              />
              <button
                type="submit"
                className="btn-rose"
                style={{ paddingBlock: '10px', fontSize: '0.85rem' }}
              >
                <Send size={15} />
                <span>Get 15% OFF Voucher</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            paddingBlockStart: '24px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.82rem',
            color: 'var(--color-text-light)',
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>Diksha's Cake House</strong>. All rights reserved. Freshly Baked ♥ Made with Love.
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>UPI • GPay • PhonePe • NetBanking • COD</span>
            <span>FSSAI Lic: 10022011000842</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
