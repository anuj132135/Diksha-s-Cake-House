import React from 'react';
import { HeartHandshake, ShieldCheck, Clock, Award, Sparkles, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: '48px' }}>
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
            <HeartHandshake size={16} />
            <span>Artisanal Heritage</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBlockEnd: '12px' }}>
            The Story of Diksha's Cake House
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.6 }}>
            Baking pure moments of joy, uncompromised honesty in ingredients, and celebrating life with handcrafted confections.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
            marginBlockEnd: '60px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBlockEnd: '16px' }}>
              From a Passionate Kitchen to 50,000+ Celebrations
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, fontSize: '0.94rem', marginBlockEnd: '14px' }}>
              Diksha's Cake House was founded with a singular conviction: birthday and celebration cakes must taste every bit as heavenly as they appear on the table. In an industry dominated by frozen sponge premixes, industrial palm shortening, and chemical emulsifiers, Chef Diksha pledged never to cut corners.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, fontSize: '0.94rem', marginBlockEnd: '14px' }}>
              Every morning at 6:00 AM, our ovens start with stone-ground flours, pure butter, farm-fresh fruit compotes, and single-origin Belgian couverture chocolate. Our kitchen features <strong>100% dedicated vegetarian and eggless prep stations</strong> with certified zero cross-contamination.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, fontSize: '0.94rem' }}>
              Whether it’s a 1st birthday, silver wedding jubilee, or a 11:45 PM midnight anniversary surprise, we put our heart into every piped rosette and calligraphy message.
            </p>
          </div>

          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'clip',
              boxShadow: 'var(--shadow-lg)',
              aspectRatio: '4 / 3.4',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
              alt="Chef Diksha decorating cake"
              style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* The 4 Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBlockEnd: '60px',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <ShieldCheck size={32} color="var(--color-veg)" style={{ marginBlockEnd: '14px' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              100% Eggless Certified
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Zero eggs, zero gelatine. Prepared in a certified pure vegetarian kitchen with natural dairy, buttermilk, and organic fruit pectins.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Award size={32} color="var(--color-secondary)" style={{ marginBlockEnd: '14px' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              64% Belgian Couverture
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              We never use compound chocolate or vegetable fats. Only real cocoa butter and single-origin chocolate for a luxurious melt-in-mouth finish.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Clock size={32} color="var(--color-primary)" style={{ marginBlockEnd: '14px' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              2-Hour Express Dispatch
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              From oven to your doorstep in 2 hours. Carried in temperature-controlled bakery carriers to guarantee immaculate structure.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Sparkles size={32} color="#D4AF37" style={{ marginBlockEnd: '14px' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              No Artificial Preservatives
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Real vanilla pods, fresh fruits, and natural cane sugars. Pure food made with the utmost love and respect for your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
