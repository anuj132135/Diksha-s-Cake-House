import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import CakeCard from '../components/CakeCard';
import { CAKES } from '../data/cakes';
import SpecialCombos from '../components/SpecialCombos';
import ReviewsSection from '../components/ReviewsSection';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Heart, MessageCircle } from 'lucide-react';

export default function HomePage({ onQuickView, onShowToast }) {
  const navigate = useNavigate();
  const bestsellerCakes = CAKES.filter(c => c.isPopular).slice(0, 4);

  return (
    <div>
      {/* Hero Banner with Logo & Branding */}
      <Hero
        onExploreCatalog={() => navigate('/cakes')}
      />

      {/* Trust & Quality Bar */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBlock: '1px solid var(--color-border)',
          paddingBlock: '24px',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  inlineSize: '48px',
                  blockSize: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-veg-bg)',
                  display: 'grid',
                  placeContent: 'center',
                  color: 'var(--color-veg)',
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-chocolate)' }}>100% Eggless Certified</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Dedicated pure vegetarian ovens & pristine hygiene
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  inlineSize: '48px',
                  blockSize: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-rose-light)',
                  display: 'grid',
                  placeContent: 'center',
                  color: 'var(--color-rose)',
                }}
              >
                <Clock size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-chocolate)' }}>2-Hour Express Delivery</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Freshly baked upon order & dispatched same-day
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  inlineSize: '48px',
                  blockSize: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  display: 'grid',
                  placeContent: 'center',
                  color: 'var(--color-chocolate)',
                }}
              >
                <Award size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-chocolate)' }}>Freshly Baked Daily</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Baked fresh from scratch with pure butter & zero preservatives
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  inlineSize: '48px',
                  blockSize: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-rose-light)',
                  display: 'grid',
                  placeContent: 'center',
                  color: 'var(--color-rose)',
                }}
              >
                <Heart size={26} fill="var(--color-rose)" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-chocolate)' }}>Midnight Surprise</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Delivery at the stroke of 11:30 PM - 12:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section style={{ paddingBlock: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBlockEnd: '32px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-rose)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--color-rose-light)',
                  paddingInline: '12px',
                  paddingBlock: '4px',
                  borderRadius: 'var(--radius-full)',
                  marginBlockEnd: '8px',
                }}
              >
                <Sparkles size={14} />
                <span>Trending Today</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, color: 'var(--color-chocolate)' }}>
                Signature Bestsellers from Diksha's Kitchen
              </h2>
            </div>

            <Link
              to="/cakes"
              className="btn-secondary"
              style={{ paddingInline: '20px', paddingBlock: '10px' }}
            >
              <span>View Full Menu ({CAKES.length} Cakes)</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px',
            }}
          >
            {bestsellerCakes.map(cake => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onQuickView={onQuickView}
                onShowToast={onShowToast}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Cake Orders via WhatsApp Banner */}
      <section
        style={{
          paddingBlock: 'clamp(3rem, 6vw, 4.5rem)',
          backgroundColor: 'var(--color-surface-subtle)',
        }}
      >
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-rose)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--color-rose-light)',
                  paddingInline: '12px',
                  paddingBlock: '4px',
                  borderRadius: 'var(--radius-full)',
                  marginBlockEnd: '12px',
                }}
              >
                <Sparkles size={16} />
                <span>Custom Cake Orders</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, marginBlockEnd: '14px', color: 'var(--color-chocolate)' }}>
                Have a Dream Cake Design in Mind?
              </h2>

              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65, fontSize: '0.94rem', marginBlockEnd: '20px' }}>
                Whether it's a theme cake, tiered celebration cake, pinata surprise, or a reference image from Pinterest or Instagram, simply send your photo to us on WhatsApp. Diksha's Cake House will bake it fresh and deliver it right to your venue!
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20have%20a%20reference%20photo%20for%20a%20custom%20cake!"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-rose"
                  style={{
                    paddingInline: '24px',
                    paddingBlock: '12px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <MessageCircle size={18} color="#25D366" />
                  <span>Send Photo on WhatsApp</span>
                </a>
                <Link
                  to="/gallery"
                  className="btn-secondary"
                  style={{ paddingInline: '20px', paddingBlock: '12px' }}
                >
                  <span>View Cake Gallery</span>
                </Link>
              </div>
            </div>

            {/* Visual Preview Teaser */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  inlineSize: '100%',
                  maxInlineSize: '340px',
                  marginInline: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'clip',
                  boxShadow: 'var(--shadow-lg)',
                  aspectRatio: '1',
                  border: '2px solid var(--color-border)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"
                  alt="Custom Designer Cake"
                  style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Combos Section */}
      <SpecialCombos onShowToast={onShowToast} />

      {/* Reviews & Social Proof */}
      <ReviewsSection onShowToast={onShowToast} />
    </div>
  );
}
